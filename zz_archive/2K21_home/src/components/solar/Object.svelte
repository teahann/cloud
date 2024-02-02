<!-- Display data for space object -->
<script lang=ts>
	import { url } from '@roxi/routify'
	export let data

	// console.log(data)
</script>

<div class="Celestial">
	<div class="Container">

		<div class="TopRow">
			<h2 title="Avg solar orbit radius">
				{data.sun_au} AU
			</h2>
			<h2 title="Orbit eccentricity">
				{data.eccentricity}
			</h2>
			<h2 title="Earth days per solar orbit">
				{data.sidereal_orbit}
			</h2>
		</div>
		
		<div class="Row">
			<h2 title={data.region} class="Name">
				{data.name}
			</h2>
			{#if data.photos[0]}
				<img src={data.photos[0]} />
			{/if}
			<h2 class="About">
				{data.about}
			</h2>
		</div>

		<a href={$url('./')}>
			Back
		</a>

	</div>
</div>

<style lang=scss>
	.Celestial {
		display: grid;
		min-height: 100vh;
		align-items: center;

		.Container {
			display: grid;
			text-align: center;
			width: 100vw;
			max-width: 900px;
			margin: 0 auto;

			.TopRow {
				display: flex;
				width: 100%;
				grid-gap: 1px;
				justify-content: space-evenly;
				color: rgb(232,232,232);
				cursor: default;

				h2 {
					width: 100%;
					line-height: 2rem;
					color: rgb(212,212,212);
					text-shadow: 0 0 2px black;
					backdrop-filter: blur(36px) saturate(0.5);
					background: rgba(30,31,33,0.4);

					&:hover {
						color: rgb(232,232,232);

					}
				}
			}

			.Row {
				display: grid;
				backdrop-filter: blur(92px) saturate(0.5);

				img {
					margin: 0.2rem auto 0.8rem auto;
					max-width: min(100%, 256px);
				}
			}

			h2 {
				margin: 0;

				&.Name {
					color: rgb(230,231,233);
					font-size: 2.8rem;
					line-height: 2.8rem;
					letter-spacing: 3px;
				}
				&.About {
					color: rgb(217,216,217);
					font-size: 1.4rem;
					line-height: 1.45rem;
					font-weight: 100;
					padding: 1.25rem 0;
				}
			}

			// Back
			a {
				color: rgb(232,252,232);
				font-size: 1.5rem;
				line-height: 3rem;
				background: rgba(40,41,43,0.4);
				text-shadow: 0 0 1px rgb(0,0,0);
				backdrop-filter: blur(92px) saturate(0.5);
			}

		}
	}
</style>
