<script lang=ts>
	import { url } from '@roxi/routify'
	import { user_req } from '~/utils/session.ts'

</script>

<div class="Theme">
	<a href={ $url('../') }>🏠</a>
	<button on:click={() => user_req.set('background')} >
		Background
	</button>
</div>

<style lang=scss>
	.Theme {
		position: fixed;
		top: 0;
		display: flex;
		width: 100vw;

		min-height: unset;
		grid-gap: 1px;
		padding: 1px;

		display: flex;
		flex-wrap: wrap;
		align-self: flex-start;
		&:last-of-type {
			justify-content: flex-end;
			align-self: flex-end;
		}

		h2, a, button {
			margin: 0;
			font-size: calc(0.9rem + 0.4vw);
			line-height: 1rem;
			padding: calc(0.5rem + 0.4vw) calc(0.4rem + 1.5vw);
			cursor: pointer;

			border: unset;
			outline: 2px solid rgba(30,31,33,0);

			backdrop-filter: blur(24px) saturate(0.5);
			color: rgb(192,192,192);
			background: linear-gradient(90deg,
				rgba(37,37,37,0.7) 0%,
				rgba(38,38,38,0.6) 80%,
				rgba(38,38,38,0.48) 100%
			);
			text-shadow: 0 0 2px rgb(0,0,0);
			box-shadow: 0 0 3px 1px rgba(80,80,80,0.5) inset;
			transition: 0.1s all cubic-bezier(0.30,0.53,0.76,1.53);

			&:hover {
				color: rgb(242,242,242);
				outline: 2px solid rgba(99,99,99,0.9);
				box-shadow: 0 0 24px 4px rgba(90,90,90,0.4) inset;
				background: linear-gradient(90deg,
					rgba(41,41,41,0.7) 0%,
					rgba(40,40,40,0.7) 50%,
					rgba(38,38,38,0.7) 100%
				);

			}

		}
	}
</style>
