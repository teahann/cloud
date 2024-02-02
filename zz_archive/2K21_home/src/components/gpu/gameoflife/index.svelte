<script lang="ts">
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing';
	import Game from './game.ts'

	const width = writable <Number> (window.innerWidth)
	const height = writable <Number> (window.innerHeight)
	const pixel_ratio = writable <Number> (window.devicePixelRatio)
	let canvas, game, resize_timeout
	let show_canvas: Boolean = true

	onMount(async () => {
		game = await new Game(canvas)
		game.run()
	})

	const hdl_resize = () => {
		if (resize_timeout) clearTimeout(resize_timeout);
		resize_timeout = setTimeout(() => {
			width.set(window.innerWidth)
			height.set(window.innerHeight)
			pixel_ratio.set(window.devicePixelRatio)
			reset_game()
		}, 333)
	}

	const reset_game = async () => {
		game.end()
		game = null
		game = await new Game(canvas)
		game.run()
	}

</script>

{#if show_canvas}
	<canvas bind:this={canvas}
		in:fade={{ duration: 2000, easing: quintOut }}
		width={$width / $pixel_ratio}
		height={$height / $pixel_ratio} >
	</canvas>
{/if}

<svelte:window on:resize|passive={hdl_resize} />


<style lang=scss>
	canvas {
		position: fixed;
		z-index: 1;

		// 🐛 flashes top of sceen below this threshold
		@media (max-width: 640px) {
			display: none;
		}
	}
</style>
