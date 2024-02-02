<script lang=ts>
	import { onMount } from 'svelte'
	import { url } from '@roxi/routify'
	
	import { user_req } from '~/utils/session.ts'

	let html_focus: HTMLInputElement
	let user_input: String = new String()

	/* --- initialize --- */
	onMount(() => {
		if (html_focus) {
			html_focus.focus()
		}
	})

	$: user_input, user_req.set(user_input)

</script>


<section>
	<input
		type="text"
		bind:this={html_focus}
		bind:value={user_input}
	/>
</section>


<style lang=scss>

	input {
		width: 800px;
		max-width: calc(100vw - 16px);
		line-height: calc(4.2rem + 1.2vw);
		backdrop-filter: blur(12px);

		margin: 0 auto;

		outline: unset;
		border: unset;

		background: rgba(30,31,33,0.4);
		text-shadow: 0 0 2px rgb(0,0,0);
		box-shadow: 0 0 3px 1px rgba(80,80,80,0.2) inset;
		border-radius: 9px;

		font-size: 2.4rem;
		text-align: center;
		color: rgb(238,252,238);

		outline: none;
		border: none;
		padding: 0;

		transition: 0.09s all linear;

		&:hover {
			border-radius: 0;
			max-width: 100vw;
			background: rgba(140,141,142,0.2);
			width: 840px;
			font-size: 2.55rem;
			color: rgb(242,242,242);
		}

		&:focus, &:active {
			background: rgba(40,42,45,0.6);
			&:hover { background: rgba(42,44,47,0.6) }
		}

	}
</style>
