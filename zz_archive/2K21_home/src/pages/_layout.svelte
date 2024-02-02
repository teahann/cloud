<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { Store } from '~/utils/store.ts'

	const bg_host: String = import.meta.env.VITE_BG_HOST
	let bg_filename = localStorage.getItem("background")
	let bg_html: HTMLDivElement = document.getElementById('hmr')

	let loading: Boolean = true
	onMount(async () => {
		if (bg_filename) {
			load_bg(bg_filename)
		}
		loading = false
	})

	const load_bg = (filename) => {
		let full_url = `${bg_host}${filename}.webp`
		bg_html.style.background = `url(${full_url}) no-repeat center center fixed`
		bg_html.style.backgroundSize = 'cover'
	}

</script>

{#if !loading}
	<slot />
{/if}
