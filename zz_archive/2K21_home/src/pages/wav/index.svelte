<!-- Root of wav (wav categories) -->
<script lang=ts>
	import { url } from '@roxi/routify'
	
	import { wav_categories } from '~/utils/session.ts'
	import { capitalize } from '~/utils/random/capitalize.js';

</script>

<div class="Wav_Categories">
	<div class="Container">

		{#each $wav_categories as cat}
			<a href={$url(`./${cat}`)} >
				{capitalize(cat)}
			</a>
		{/each}

		<a href={ $url('../') } class="Back" >
			Back
		</a>

	</div>
</div>

<style lang=scss>
	.Wav_Categories {
		display: grid;
		flex-wrap: wrap;
		text-align: center;
		align-content: center;
		min-height: 100vh;
		grid-gap: 4px;

		.Container {
			backdrop-filter: blur(42px) saturate(1.6);
			text-shadow: 0 0 2px rgb(0,0,0);
			box-shadow: 0 0 3px 1px rgba(80,80,80,0.5) inset;

			border-radius: 4px;
			width: calc(100dvw - 52px);
			max-width: 600px;
			margin: 0px auto;

			display: grid;
			grid-gap: 4px;
			grid-template-columns: repeat(2, 1fr);
			padding: 4px;

			background: linear-gradient(
				-45deg,
				rgba(37,37,37,0.8) 0%,
				rgba(38,38,38,0.4) 100%
			);

			a {
				display: block;
				width: 100%;
				font-size: 2rem;
				line-height: 4rem;
				color: rgb(232,232,232);

				font-weight: 100;

				text-shadow: 0 0 2px rgb(0,0,0);
				transition: 0.05s all linear;

				&.Back {
					grid-column: span 2;
				}

				&:hover {
					color: white;
					letter-spacing: 1px;
					text-decoration: underline;
				}

			}

		}
	}
</style>
