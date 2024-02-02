<script lang=ts>
	import { user_req } from '~/utils/session.ts'

	const clear_request = () => {
		user_req.set( new String() )
	}
	
</script>

<div class="Contain">
	<button on:click={() => user_req.set(new String)} >
		Start
	</button>
</div>

<style lang=scss>
	.Contain {
		display: grid;
		min-height: 66vh;
		align-items: center;
		justify-content: flex-end;

		button {
			border: unset;
			outline: unset;
			border-radius: 9px 0 0 9px;

			font-size: 1.5rem;
			line-height: 33vh;
			min-width: 128px;

			background: rgba(180,182,182,0.3);
			text-shadow: 0 0 2px rgb(0,0,0);
			backdrop-filter: blur(24px);
			color: rgba(230,231,233,0.9);
			transition: 0.1s all ease-in;

			&:hover {
				font-size: 1.75rem;
				min-width: 164px;
				color: rgba(230,231,233,0.9);
				line-height: calc(33vh + 2rem);
			}
		}
	}
</style>
