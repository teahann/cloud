<script lang=ts>
	import { url } from '@roxi/routify'
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'

	export let data
	let pdb_url: string = `${import.meta.env.VITE_PDB_HOST}${data.pid}.pdb`	
	let canvas, adapter, device, context, format
	let gpu_limits = writable({})

	onMount( async () => {		
		await init_gpu()
		console.log(adapter)
		console.log(device)
		console.log(context)
	})

	const init_gpu = async () => {
		adapter = await navigator.gpu.requestAdapter()
		if (!adapter) {
			throw new Error("No GPU adapter")
		}
		device = await adapter.requestDevice()
		
		context = canvas.getContext("webgpu")
		format = navigator.gpu.getPreferredCanvasFormat()
		context.configure({ device: device, format: format })

	}


</script>


<canvas bind:this={canvas} />

<section>
	<h2 class="Row">{data.name} ({data.category})</h2>
	<a href={$url('./index')} class="Row" >Back</a>
</section>

<style lang=scss>
	h2 {
		color: rgb(242,242,242);
	}
</style>

