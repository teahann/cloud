<script type=ts>
	import { onMount } from 'svelte'
	import { url, goto, params } from '@roxi/routify'

	import { wavs } from '~/utils/session.ts'
	import { capitalize } from '~/utils/random/capitalize.ts';

	onMount(() => {
		if ($wavs.length === 0) {
			$goto('../')
		}
	})

	const category = $params.category
	const url_base = `${import.meta.env.VITE_WAV_HOST}${category}`

</script>


<div class="Wavs">
	<div class="Container">

		<h2>{capitalize($wavs[0].category)}s</h2>

		<div class="Contain">
			{#each $wavs as wav}
				<a href={ $url(`${url_base}/${category}_${wav.name}.wav`) } >
					{wav.name}
				</a>
			{/each}
		</div>
		
		<a href={ $url('../') }>Back</a>
	
	</div>
</div>


<style lang=scss>
	.Wavs {
		display: grid;
		flex-wrap: wrap;
		text-align: center;
		align-content: center;
		min-height: 100vh;
		grid-gap: 1px;

		.Container {
			display: grid;
			grid-gap: 1px;

			width: calc(100dvw - 24px);
			max-width: 600px;
			margin: 8px auto;
		
			background: rgba(30,31,33,0.6);
			box-shadow: 0 0 12px 3px rgba(20,20,20,0.8) inset;
			backdrop-filter: blur(24px) saturate(0.5);
			border-radius: 8px;


			// top and bottom bars		
			h2, a {
				font-size: 2rem;
				line-height: 3.5rem;
				color: rgb(232,232,232);

				text-shadow: 0 0 4px rgba(30,31,33,1);
				font-weight: 100;
				margin: 0 auto;
			}

			a {
				&:hover {
					text-decoration: underline;
				}
			}

			.Contain {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12%, 1fr));

				flex-wrap: wrap;
				grid-gap: 1px;
				padding: 0 12px;

				max-height: calc(100vh - 12rem);
				overflow: auto;

				a {
					margin: 0;

					font-size: 1.4rem;
					line-height: 2.8rem;

					cursor: pointer;
					outline: unset;
					border: unset;

					color: rgb(106,106,106);
					text-shadow: 0 0 2px rgb(0,0,0);
					box-shadow: 0 0 1px 1px rgba(92,92,92,0.5) inset;
					transition: 0.1s all cubic-bezier(0.15,0.1,0.76,1.53);

					background: linear-gradient(
						-45deg,
						rgba(47,47,47,0.75) 0%,
						rgba(48,48,48,0.9) 100%
					);
					&:nth-child(2n) {
						background: linear-gradient(
							125deg,
							rgba(47,47,47,0.75) 0%,
							rgba(38,38,38,0.9) 60%,
							rgba(38,38,38,0.75) 100%
						);
					}

					&:hover {
						color: rgb(248,252,252);
						box-shadow: 0 0 1px 1px rgba(120,120,120,0.4) inset;
					}
				}
			}
		}

	}
</style>
