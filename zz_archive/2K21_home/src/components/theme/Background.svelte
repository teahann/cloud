<script lang=ts>
	import { onMount } from 'svelte'
	import { url } from '@roxi/routify'
	import { user_req, backgrounds } from '~/utils/session.ts'

	const bg_html = document.getElementById('hmr')
	const bg_host: String = import.meta.env.VITE_BG_HOST
	let current_bg_filename = localStorage.getItem('background');

	const set_bg = (filename) => {
		localStorage.setItem('background',filename)
		current_bg_filename = localStorage.getItem('background')
		load_css(filename)
	}

	const load_css = (filename) => {
		let full_url = `${bg_host}${filename}.webp`
		bg_html.style.background = `url(${full_url}) no-repeat center center fixed`
		bg_html.style.backgroundSize = 'cover'
	}

</script>

<main>
	<div class="Container">
		{#each Object.values($backgrounds) as bg}
			<button on:click={() => set_bg(bg.filename)}
				class:Active={bg.filename === current_bg_filename} >
				{bg.title}
			</button>
		{/each}
		<button on:click={() => user_req.set(new String())}>
			Close
		</button>
	</div>
</main>

<style lang=scss>

	main {
		height: 100vh;
		overflow: auto;
		display:grid;
		align-items: center;
		margin: 0 auto;
		max-width: 840px;

		.Container {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			grid-gap: 1px;

			a, button {
				cursor: pointer;
				font-size: calc(1rem + 0.125vw);

				color: rgb(216,216,216);
				padding: 0.8rem 1.4rem;

				background: rgba(40,41,42,0.6);
				backdrop-filter: blur(24px) saturate(0.7);

				transition: 0.05s all ease-in;
				outline: 1px solid rgba(30,31,33,0);
				border: 2px solid rgba(128,128,128,0);

				&:hover {
					color: rgb(242,242,242);
					outline: 2px solid rgba(99,99,99,0.86);
					background: rgba(52,54,55,0.6);
				}

				&.Active {
					color: rgb(252,252,252);
					text-decoration: underline;
					border: 2px solid rgba(128,128,128,1);
				}
			}
		}
	}
</style>
