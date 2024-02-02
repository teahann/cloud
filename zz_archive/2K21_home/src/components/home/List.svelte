<script lang=ts>
	import { url } from '@roxi/routify'
	import { user_req, commands, external_links } from '~/utils/session.ts'
	
</script>

<header>
	{#each $commands as c}
		{#if c.listed}
			{#if c.has_module}
				<a href={ $url(c.name.toLowerCase()) } >{c.name}</a>
			{:else if c.external_link}
				<a href={ $url(c.external_link) } >{c.name}</a>
			{:else}
				<button on:click={() => user_req.set(c.name)} >{c.name}</button>
			{/if}
		{/if}
	{/each}
</header>

<style lang=scss>
	header {
		width: calc(100vw - 4px);
		max-width: 1200px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		grid-gap: 1px;
		padding: 1px;
		margin: 0 auto;
		

		a, button {
			backdrop-filter: blur(24px) saturate(0.5);
			background: linear-gradient(135deg,
				rgba(27,27,27,0.6) 0%,
				rgba(28,28,28,0.4) 80%,
				rgba(28,28,28,0.28) 100%
			);
			min-width: 120px;
			font-size: 1.4rem;
			line-height: 2.4rem;
			text-align: center;
			cursor: pointer;

			border: unset;
			outline: 2px solid rgba(30,31,33,0);

			color: rgb(192,192,192);
			text-shadow: 0 0 2px rgb(0,0,0);

			&:hover {
				color: rgb(242,242,242);
				background: linear-gradient(45deg,
					rgba(67,67,67,0.7) 0%,
					rgba(68,68,68,0.6) 80%,
					rgba(68,68,68,0.48) 100%
				);
			}

		} // a, button
	}
</style>
