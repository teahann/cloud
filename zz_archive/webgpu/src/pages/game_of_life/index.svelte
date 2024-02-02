<script lang="ts">
	import { onMount } from 'svelte'
	import { url } from '@roxi/routify'
	import { fade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

	import greetings from './greetings.json'
	import Gol from './gol.ts'
	import { writable } from 'svelte/store'

	const width = writable <Number> (window.innerWidth)
	const height = writable <Number> (window.innerHeight)
	const pixel_ratio = writable <Number> (window.devicePixelRatio)
	let show_canvas: Boolean = true
	let canvas, game, resize_timeout

	const rand_greeting = () => greetings[Math.floor(Math.random() * greetings.length)]
	let current_greeting = rand_greeting()

	onMount(async () => {
		game = await new Gol(canvas)
		game.run()
	})

	const hdl_resize = () => {
		if (resize_timeout) clearTimeout(resize_timeout)
		resize_timeout = setTimeout(() => {
			width.set(window.innerWidth)
			height.set(window.innerHeight)
			pixel_ratio.set(window.devicePixelRatio)
			reset_game()
		}, 333)
	}

	const reset_game = async () => {
		await end_game()
		start_game()
	}

	const start_game = async () => {
		game = await new Gol(canvas)
		game.run()
	}

	const end_game = () => {
		game.end()
		game = null
	}

</script>

<main>
	<h2 class="Row"
		on:click={() => current_greeting = rand_greeting()}
		title={current_greeting[1]} >
		{current_greeting[0]}
	</h2>
	<a href={ $url('../') } class="Row" >Back</a>
</main>

<canvas bind:this={canvas}
	in:fade={{ duration: 2000, easing: quintOut }}
	width={$width / $pixel_ratio}
	height={$height / $pixel_ratio} />

<svelte:window on:resize|passive={hdl_resize} />


<style lang=scss>
	main {
		z-index: 5;
		h2 { cursor: pointer }
	}
	canvas {
		position: fixed;
		z-index: 1;
		// 🐛 top of screen flashes
		@media (max-width: 640px) { display: none }
	}
</style>
