<script lang=ts>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { url } from '@roxi/routify'
	import { vec3, mat4 } from 'gl-matrix';
	import { CubeData } from './cube.ts'

	let device_name, canvas, resize_timeout
	let animating: boolean = true

	const get_inner_width = () => {
		return Math.min(window.innerWidth - 8, 600)
	}

	const width = writable(get_inner_width())
	const height = writable(window.innerHeight * 0.5)
	const pixel_ratio = writable(window.devicePixelRatio)

	const shader = `
		struct Uniforms { mvp_matrix : mat4x4<f32> }
		@binding(0) @group(0) var<uniform> uniforms : Uniforms;
		struct Output {
			@builtin(position) Position : vec4<f32>,
			@location(0) vColor : vec4<f32>,
		};
		@vertex
		fn vs_main(@location(0) pos: vec4<f32>, @location(1) color: vec4<f32>) -> Output {
			var output: Output;
			output.Position = uniforms.mvp_matrix * pos;
			output.vColor = color;
			return output;
		}
		@fragment
		fn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
			return vColor;
		}
	`
	
	onMount(async() => init_animation())

	const init_gpu = async () => {
		const adapter = await navigator.gpu.requestAdapter()
		const device = await adapter?.requestDevice()
		const context = canvas.getContext('webgpu', { alpha:true })
		const format = navigator.gpu.getPreferredCanvasFormat()
		context.configure({ device:device, format:format, alphaMode:'premultiplied' })
		return{ device, canvas, format, context }
	}

	const init_animation = async() => {
		const gpu = await init_gpu()
		const device = gpu.device
		const cube_data = CubeData();
		const number_of_vertices = cube_data.positions.length / 3
		const vertex_buffer = create_gpu_buffer(device, cube_data.positions)
		const color_buffer = create_gpu_buffer(device, cube_data.colors)

		const p_buffers = [
			{ arrayStride:12, attributes:[{ shaderLocation:0, format:"float32x3", offset:0 }] },
			{ arrayStride:12, attributes:[{ shaderLocation:1, format:"float32x3", offset:0 }] }
		]

		const pipeline = device.createRenderPipeline({
			layout:'auto',
			vertex: {
				module: device.createShaderModule({ code:shader }),
				entryPoint: "vs_main",
				buffers: p_buffers
			},
			fragment: {
				module: device.createShaderModule({ code:shader }),
				entryPoint: "fs_main",
				targets: [{ format:gpu.format }]
			},
			primitive: { topology:"triangle-list" },
			depthStencil: { format:"depth24plus", depthWriteEnabled:true, depthCompare:"less" }
		})

		const model_matrix = mat4.create()
		const mvp_matrix = mat4.create()
		let v_matrix = mat4.create()
		let vp_matrix = mat4.create()
		const vp = create_view_projection($width / $height)
		vp_matrix = vp.view_projection_matrix
		let rotation = vec3.fromValues(0,0,0)

		const uniform_buffer = device.createBuffer({ size:64, usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST })
		const uniform_bind_group = device.createBindGroup({
			layout: pipeline.getBindGroupLayout(0),
			entries: [{ binding:0, resource:{ buffer:uniform_buffer, offset:0, size:64 } }]
		})

		let texture_view = gpu.context.getCurrentTexture().createView()
		const depth_texture = device.createTexture({
			size:[$width, $height, 1],
			format:"depth24plus",
			usage: GPUTextureUsage.RENDER_ATTACHMENT
		})

		const render_pass_desc = {
			colorAttachments: [{
				view: texture_view,
				clearValue: {r:0,g:0,b:0,a:0},
				loadValue: {r:0,g:0,b:0,a:0},
				loadOp: 'clear',
				storeOp: 'store'
			}],
			depthStencilAttachment: {
				view: depth_texture.createView(),
				depthClearValue: 1.0,
				depthLoadOp:'clear',
				depthStoreOp: "store"
			}
		}

		function draw() {
			if (!animating) {
				if (camera.tick()) {
					const p_matrix = vp.projectionMatrix
					v_matrix = camera.matrix
					mat4.multiply(vp_matrix, p_matrix, v_matrix)
				}
			}
			create_transforms(model_matrix, [0,0,0], rotation)
			mat4.multiply(mvp_matrix, vp_matrix, model_matrix)
			device.queue.writeBuffer(uniform_buffer, 0, mvp_matrix)
			texture_view = gpu.context.getCurrentTexture().createView()
			render_pass_desc.colorAttachments[0].view = texture_view
			const command_encoder = device.createCommandEncoder()
			const render_pass = command_encoder.beginRenderPass(render_pass_desc)

			render_pass.setPipeline(pipeline)
			render_pass.setVertexBuffer(0, vertex_buffer)
			render_pass.setVertexBuffer(1, color_buffer)
			render_pass.setBindGroup(0, uniform_bind_group)
			render_pass.draw(number_of_vertices)
			render_pass.end()

			device.queue.submit([command_encoder.finish()])
		}

		create_animation(draw, rotation, animating)
	}

	const create_gpu_buffer = (device, data, usageFlag = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST ) => {
		const d_buffer = { size:data.byteLength, usage:usageFlag, mappedAtCreation:true }
		const buffer = device.createBuffer(d_buffer)
		new Float32Array(buffer.getMappedRange()).set(data)
		buffer.unmap()
		return buffer
	}

	const create_view_projection = (r_ratio = 1.0, camera_p=[2,2,4], look_dir=[0,0,0], up_dir = [0,1,0]) => {
		const view_matrix = mat4.create()
		const projection_matrix = mat4.create()
		const view_projection_matrix = mat4.create()
		mat4.perspective(projection_matrix, 2*Math.PI/5, r_ratio, 0.1, 100.0)
		mat4.lookAt(view_matrix, camera_p, look_dir, up_dir)
		mat4.multiply(view_projection_matrix, projection_matrix, view_matrix)
		const camera_option = { eye:camera_p, center:look_dir, zoomMax:100, zoomSpeed:2 }
		return { view_matrix, projection_matrix, view_projection_matrix, camera_option }
	}

	const create_transforms = (model_mat, translation=[0,0,0], rotation=[0,0,0], scaling=[1,1,1]) => {
		const rotate_x_mat = mat4.create()
		const rotate_y_mat = mat4.create()
		const rotate_z_mat = mat4.create()
		const translate_mat = mat4.create()
		const scale_mat = mat4.create()
		mat4.fromTranslation(translate_mat, translation)
		mat4.fromXRotation(rotate_x_mat, rotation[0])
		mat4.fromYRotation(rotate_y_mat, rotation[1])
		mat4.fromZRotation(rotate_z_mat, rotation[2])
		mat4.fromScaling(scale_mat, scaling)
		mat4.multiply(model_mat, rotate_x_mat, scale_mat)
		mat4.multiply(model_mat, rotate_y_mat, model_mat)
		mat4.multiply(model_mat, rotate_z_mat, model_mat)
		mat4.multiply(model_mat, translate_mat, model_mat)
	}

	const create_animation = (draw, rotation=vec3.fromValues(0,0,0), animating=true) => {
		function step() {
			if(animating){
				rotation[0] += 0.01
				rotation[1] += 0.01
				rotation[2] += 0.01
			} else {
				rotation = [0,0,0]
			}
			draw()
			requestAnimationFrame(step)
		}
		requestAnimationFrame(step)
	}

	const hdl_resize = () => {
		if (resize_timeout) clearTimeout(resize_timeout)
		resize_timeout = setTimeout(() => location.reload(), 250)
	}

</script>

<main>
	<canvas bind:this={canvas} width={$width/$pixel_ratio} height={$height/$pixel_ratio} />
	<a href={ $url('../') } class="Row" >Back</a>
</main>

<svelte:window on:resize|passive={hdl_resize} />

<style lang=scss>
	main {
		canvas {
			border-radius: 24px 24px 0 0;
			background: rgba(30,31,33,0.2);
			backdrop-filter: blur(6px);
			margin: 0 auto;
		}
	}
</style>
