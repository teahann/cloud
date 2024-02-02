<script lang=ts>
	import { url } from '@roxi/routify'
	import { user_req, yt_vids } from '~/utils/session.ts'

</script>

<div class="SpaceList">
	{#each $yt_vids as v}
		<a href={ $url(v.link) } >{v.title}</a>
	{/each}
	<a href={ $url('../') }>Exit</a>
</div>

<style lang=scss>
	.SpaceList {
		display: grid;
		justify-content: center;
		grid-gap: 1px;
		padding: 2px;

		margin: 0 auto;
		background: rgba(30,31,42,0.3);
		backdrop-filter: blur(24px) saturate(0.5);

		max-height: calc(100vh - 8rem);
		overflow: auto;

		$lh: calc(1.5rem + 1vh + 1vw);
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
			text-shadow: 0 0 3px rgba(30,31,33,0.8);
 
			min-width: 90px;
			transition: all 0.15s cubic-bezier(0.6, 0.2, 0.1, 0.2);

			&:hover {
				color: rgb(236,252,236);
				background: rgba(97,97,97,0.76);
			}
		}

	}
</style>
