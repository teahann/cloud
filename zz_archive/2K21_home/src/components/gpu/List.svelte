<script lang=ts>
	import { url } from '@roxi/routify'
	import { user_req, gpu_directory } from '~/utils/session.ts'

	const set_req = async (name) => {
		await user_req.set(new String())
		user_req.set(name)
	}

</script>


<div class="Gpu">
	{#if $user_req !== 'Game of Life'}
		{#each $gpu_directory as g}
			<button class="Row" title={g.description}
				on:click={ () => set_req(g.name)} >
				{g.name}
			</button>
		{/each}
	{/if}
	<a href={ $url('../') } class="Row" >Exit</a>
</div>


<style lang=scss>
	.Gpu {
		display: grid;
		justify-content: center;

		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		backdrop-filter: blur(18px) saturate(0.8);

		max-height: calc(100vh - 5rem);
		overflow: auto;
		z-index: 5;

		$lh: 3.6rem;
		a, button {
			cursor: pointer;
			outline: unset;
			border: unset;
			font-size: 1.8rem;
			letter-spacing: 1px;

			line-height: $lh;
			color: rgb(210,210,210);
			background: rgba(30,31,33,0);
			box-shadow: unset;
			transition: all 0.12s cubic-bezier(0.6, 0.2, 0.1, 0.2);

			&:hover {
				color: rgb(242,252,242);
				background: rgba(60,61,63,0.4);
			}
		}

	}
</style>
