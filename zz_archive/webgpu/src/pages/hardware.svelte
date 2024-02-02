<script lang=ts>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { url } from '@roxi/routify'

	let device_name: string = new String()
	let output: string = new String()

	onMount( async() => {
		const adapter = await navigator.gpu.requestAdapter()
		const info = await adapter.requestAdapterInfo()

		device_name = `${(info.vendor)} ${(info.architecture)}`
		output += `<h3>Features</h3>`
		adapter.features.forEach( feat => output += `<code>${feat}</code>` )
		output += `<h3>Limits</h3>`
		for(let i in adapter.limits) output += `<code>${i}: ${adapter.limits[i]}</code>`
	})

</script>

<main>
	<h2 class="Row" >{device_name}</h2>
	<div class="Specs">{@html output}</div>
	<a href={ $url('./index') } class="Row" >Back</a>
</main>

<style lang=scss>
	main {
		.Specs {
			display: grid;
			background: rgba(30,31,33,0.6);
			backdrop-filter: blur(24px) saturate(0.5);
			width: 100%;
			max-height: calc(100dvh - 12rem);
			max-width: 600px;
			margin: 0 auto;
			overflow: auto;
			color: white;
			padding: 0.5rem 0;
		}
	}
</style>
