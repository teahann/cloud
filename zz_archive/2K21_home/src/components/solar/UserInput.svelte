<script lang=ts>
	import { onMount } from 'svelte'
	import { params, goto } from '@roxi/routify'
	import { user_req } from '~/utils/session.ts'

	let user_input: string = new String()
	let html_focus: HTMLInputElement

	onMount(() => setTimeout(() => { html_focus.focus() }, 333))

	$: user_input, user_req.set(user_input)

</script>


<input type="text" bind:value={user_input} bind:this={html_focus} />


<style lang=scss>
	input {
		width: 100%;

		line-height: calc(3.2rem + 1.2vw);
		backdrop-filter: blur(24px) saturate(0.8);

		margin: 0 auto;

		outline: unset;
		border: unset;

		background: rgba(30,31,33,0.1);
		text-shadow: 0 0 2px rgb(0,0,0);

		font-size: 2.4rem;
		text-align: center;
		color: rgb(238,252,238);

		outline: none;
		border: none;
		padding: 0;

		transition: 0.09s all linear;

		&:hover {
			background: rgba(90,90,90,0.2);
			font-size: 2.55rem;
			color: rgb(242,242,242);
		}

		&:focus, &:active {
			background: rgba(45,45,45,0.4);
			&:hover { background: rgba(42,44,47,0.6) }
		}

	}
</style>
