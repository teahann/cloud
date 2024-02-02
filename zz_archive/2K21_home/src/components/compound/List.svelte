<script lang=ts>
	import { url } from '@roxi/routify'
	import { user_req, compounds } from '~/utils/session.ts'

</script>


<div class="Compounds">
	{#each $compounds as c}
		<a href={ $url(`./${c.pid}`) } title={c.category} >
			{c.name}
		</a>
	{/each}
	<a href={ $url('../') }>
		Exit
	</a>
</div>


<style lang=scss>
	.Compounds {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		grid-gap: 1px;
		padding: 4px 0;

		max-width: 900px;
		margin: 0 auto;
		backdrop-filter: blur(24px) saturate(0.8);

		max-height: calc(100vh - 5rem);
		overflow: auto;

		$lh: 3rem;
		a {
			cursor: pointer;
			outline: unset;
			border: unset;
			font-size: 1.3rem;
			letter-spacing: 1px;

			line-height: $lh;
			padding: 0 calc(0.4rem + 0.6vw);

			color: rgb(210,210,210);
			background: rgba(30,31,33,0.9);
			text-shadow: 0 0 3px rgba(30,31,33,0.9);

			min-width: 64px;
			transition: all 0.12s cubic-bezier(0.6, 0.2, 0.1, 0.2);

			&:hover {
				color: rgb(242,252,242);
				background: rgba(60,61,63,1);
			}
		}

	}
</style>
