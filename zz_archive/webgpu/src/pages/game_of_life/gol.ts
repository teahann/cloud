
interface RGBAColor {
	r: number
	g: number
	b: number
	a: number
}

export default class Gol {
	width: Number
	height: Number
	grid_size: [Number, Number]
	pixel_ratio: Number
	workgroup_size: Number
	cells_count: Number
	update_interval: Number
	bg_rgb: RGBAColor
	canvas: any
	adapter: any
	device: any
	context: any
	canvas_format: any
	encoder: any
	pass: any
	vertices: any
	vertex_buffer: any
	vertex_buffer_layout: any
	bind_group_layout: any
	pipeline_layout: any
	cell_shader_module: any
	cell_pipeline: any
	simulation_shader_module: any
	simulation_pipeline: any
	uniform_array: any
	uniform_buffer: any
	cell_state_array: any
	cell_state_storage: any
	bind_groups: any
	step: any
	compute_pass: any
	workgroup_count: any
	interval_id: any

	constructor(canvas: any) {
		this.canvas = canvas
		this.workgroup_size = 8
		this.bg_rgb = { r: 0, g: 0, b: 0, a: 1 }
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixel_ratio = window.devicePixelRatio
		this.grid_size = [this.width, this.height]
		this.step = 0
		this.update_interval = 20
		this.cells_count = this.grid_size.reduce((a,b) => a*b, 1)
	}

	async run() {
		await this.get_device()
		this.pipeline()
		this.shaders()
		this.grid()
		this.interval_id = setInterval(() => this.update(), this.update_interval )
	}

	async get_device() {
		this.adapter = await navigator.gpu.requestAdapter()
		if (!this.adapter) {
			throw new Error("No GPU adapter")
		}
		this.device = await this.adapter.requestDevice()
	}

	pipeline() {
		// Canvas config
		this.context = this.canvas.getContext("webgpu")
		this.canvas_format = navigator.gpu.getPreferredCanvasFormat()
		this.context.configure({ device: this.device, format: this.canvas_format })

		// Single cell buffer
		this.vertices = new Float32Array([
			-0.8, -0.8,
			0.8, -0.8,
			0.8, 0.8,

			0.8, -0.8,
			0.8, 0.8,
			-0.8, 0.8,
		])
		this.vertex_buffer = this.device.createBuffer({
			label: "Cell vertices",
			size: this.vertices.byteLength,
			usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
		})
		this.device.queue.writeBuffer(this.vertex_buffer, 0, this.vertices)

		this.vertex_buffer_layout = {
			arrayStride: 8,
			attributes: [{
				format: "float32x2",
				offset: 0,
				shaderLocation: 0
			}]
		}

		// Create the bind group layout and pipeline layout.
		this.bind_group_layout = this.device.createBindGroupLayout({
			label: "Cell Bind Group Layout",
			entries: [{
				binding: 0,
				visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
				buffer: {} // Grid uniform buffer
			}, {
				binding: 1,
				visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
				buffer: { type: "read-only-storage"} // Cell state input buffer
			}, {
				binding: 2,
				visibility: GPUShaderStage.COMPUTE,
				buffer: { type: "storage"} // Cell state output buffer
			}]
		})

		this.pipeline_layout = this.device.createPipelineLayout({
			label: "Cell Pipeline Layout",
			bindGroupLayouts: [ this.bind_group_layout ]
		})
	}

	shaders() {
		this.cell_shader_module = this.device.createShaderModule({
			label: "Cell shader",
			code: `
				struct VertexOutput {
					@builtin(position) position: vec4f,
					@location(0) cell: vec2f
				};

				@group(0) @binding(0) var<uniform> grid: vec2f;
				@group(0) @binding(1) var<storage> cellState: array<u32>;

				@vertex
				fn vertexMain(@location(0) position: vec2f, @builtin(instance_index) instance: u32) -> VertexOutput {
					var output: VertexOutput;

					let i = f32(instance);
					let cell = vec2f(i % grid.x, floor(i / grid.x));

					let scale = f32(cellState[instance]);
					let cellOffset = cell / grid * 2;
					let gridPos = (position*scale+1) / grid - 1 + cellOffset;

					output.position = vec4f(gridPos, 0, 1);
					output.cell = cell / grid;
					return output;
				}

				@fragment
				fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
					return vec4f(input.cell, 1.0 - input.cell.x, 1);
				}
			`
		})

		// Create a pipeline that renders the cell.
		this.cell_pipeline = this.device.createRenderPipeline({
			label: "Cell pipeline",
			layout: this.pipeline_layout,
			vertex: {
				module: this.cell_shader_module,
				entryPoint: "vertexMain",
				buffers: [this.vertex_buffer_layout]
			},
			fragment: {
				module: this.cell_shader_module,
				entryPoint: "fragmentMain",
				targets: [{
					format: this.canvas_format
				}]
			}
		})

		// Create the compute shader that will process the game of life simulation.
		this.simulation_shader_module = this.device.createShaderModule({
			label: "Life simulation shader",
			code: `
				@group(0) @binding(0) var<uniform> grid: vec2f;

				@group(0) @binding(1) var<storage> cellStateIn: array<u32>;
				@group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

				fn cellIndex(cell: vec2u) -> u32 {
					return (cell.y % u32(grid.y)) * u32(grid.x) + (cell.x % u32(grid.x));
				}

				fn cellActive(x: u32, y: u32) -> u32 {
					return cellStateIn[cellIndex(vec2(x, y))];
				}

				@compute @workgroup_size(${this.workgroup_size}, ${this.workgroup_size})
				fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
					// Determine how many active neighbors this cell has.
					let activeNeighbors = cellActive(cell.x+1, cell.y+1) +
						cellActive(cell.x+1, cell.y) +
						cellActive(cell.x+1, cell.y-1) +
						cellActive(cell.x, cell.y-1) +
						cellActive(cell.x-1, cell.y-1) +
						cellActive(cell.x-1, cell.y) +
						cellActive(cell.x-1, cell.y+1) +
						cellActive(cell.x, cell.y+1);

					let i = cellIndex(cell.xy);

					// Conway's game of life rules:
					switch activeNeighbors {
						case 2: { // Active cells with 2 neighbors stay active.
							cellStateOut[i] = cellStateIn[i];
						}
						case 3: { // Cells with 3 neighbors become or stay active.
							cellStateOut[i] = 1;
						}
						default: { // Cells with < 2 or > 3 neighbors become inactive.
							cellStateOut[i] = 0;
						}
					}
				}
			`
		})

		// Create a compute pipeline that updates the game state.
		this.simulation_pipeline = this.device.createComputePipeline({
			label: "Simulation pipeline",
			layout: this.pipeline_layout,
			compute: {
				module: this.simulation_shader_module,
				entryPoint: "computeMain",
			}
		})
	}

	grid() {
		this.uniform_array = new Float32Array([this.grid_size[0], this.grid_size[1]])
		this.uniform_buffer = this.device.createBuffer({
			label: "Grid Uniforms",
			size: this.uniform_array.byteLength,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
		})
		this.device.queue.writeBuffer(this.uniform_buffer, 0, this.uniform_array)

		// Create an array representing the active state of each cell.
		this.cell_state_array = new Uint32Array(this.grid_size[0] * this.grid_size[1])

		// Create two storage buffers to hold the cell state.
		this.cell_state_storage = [
			this.device.createBuffer({
				label: "Cell State A",
				size: this.cell_state_array.byteLength,
				usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
			}),
			this.device.createBuffer({
				label: "Cell State B",
				size: this.cell_state_array.byteLength,
				usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
			})
		]

		
		// Set each cell to a random state, then copy JS array to storage buffer.
		for (let i = 0; i < this.cell_state_array.length; ++i) {
			this.cell_state_array[i] = Math.random() > 0.6 ? 1 : 0;
		}
		this.device.queue.writeBuffer(this.cell_state_storage[0], 0, this.cell_state_array)

		// Create a bind group to pass the grid uniforms into the pipeline
		this.bind_groups = [
			this.device.createBindGroup({
				label: "Cell renderer bind group A",
				layout: this.bind_group_layout,
				entries: [{
					binding: 0,
					resource: { buffer: this.uniform_buffer }
				}, {
					binding: 1,
					resource: { buffer: this.cell_state_storage[0] }
				}, {
					binding: 2,
					resource: { buffer: this.cell_state_storage[1] }
				}],
			}),
			this.device.createBindGroup({
				label: "Cell renderer bind group B",
				layout: this.bind_group_layout,
				entries: [{
					binding: 0,
					resource: { buffer: this.uniform_buffer }
				}, {
					binding: 1,
					resource: { buffer: this.cell_state_storage[1] }
				}, {
					binding: 2,
					resource: { buffer: this.cell_state_storage[0] }
				}],
			})
		]
	}

	update() {
		this.encoder = this.device.createCommandEncoder()

		this.compute_pass = this.encoder.beginComputePass()
		this.compute_pass.setPipeline(this.simulation_pipeline)
		this.compute_pass.setBindGroup(0, this.bind_groups[this.step % 2])
		this.workgroup_count = Math.ceil(this.grid_size[0] / this.workgroup_size)
		this.compute_pass.dispatchWorkgroups(this.workgroup_count, this.workgroup_count)
		this.compute_pass.end()

		this.step++

		// Start render pass
		this.pass = this.encoder.beginRenderPass({
			colorAttachments: [{
				view: this.context.getCurrentTexture().createView(),
				loadOp: "clear",
				clearValue: this.bg_rgb,
				storeOp: "store"
			}]
		})

		// Draw the grid.
		this.pass.setPipeline(this.cell_pipeline)
		this.pass.setBindGroup(0, this.bind_groups[this.step % 2])
		this.pass.setVertexBuffer(0, this.vertex_buffer)
		this.pass.draw(this.vertices.length / 2, this.grid_size[0] * this.grid_size[1])
		// End the render pass and submit the command buffer
		this.pass.end()
		this.device.queue.submit([this.encoder.finish()])
	}

	end() {
		// clear the interval for game updating
		clearInterval(this.interval_id);

		// reset the canvas
		this.canvas = null;

		// dispose WebGL context and resources
		if (this.context) {
			this.context = null;
		}

		// free GPU resources
		if (this.device) {
			this.device = null;
		}

		// free memory
		this.grid_size = null;
		this.bg_rgb = null;
		this.vertices = null;
		this.vertex_buffer = null;
		this.uniform_array = null;
		this.cell_state_array = null;
		this.cell_state_storage = null;

		// nullify others
		this.bind_group_layout = null;
		this.pipeline_layout = null;
		this.cell_shader_module = null;
		this.cell_pipeline = null;
		this.simulation_shader_module = null;
		this.simulation_pipeline = null;
	}
}