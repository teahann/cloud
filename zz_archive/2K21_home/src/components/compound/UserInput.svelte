<script lang=ts>
	import { onMount } from 'svelte'
	import { params, goto } from '@roxi/routify'
	import { user_req, compounds } from '~/utils/session.ts'

	let user_input: String = new String()
	let html_focus: HTMLInputElement

	onMount(() => setTimeout(() => { html_focus.focus() }, 333))

	$: user_input, react()

	const react = () =>{
		user_req.set(user_input.toLowerCase())
		$compounds.forEach(c => {
			if (c.name.toLowerCase() === $user_req) {
				$goto(`./${c.pid}`)
			}
		})
		if (['exit','back','home'].includes($user_req)) {
			$goto(`../`)
		}
	}

</script>


<input type="text" bind:value={user_input} bind:this={html_focus} />


<style lang=scss>
	input {
		width: calc(100% - 4px); 
		max-width: 900px;

		line-height: 4.5rem;
		backdrop-filter: blur(24px) saturate(0.8);

		margin: 0 auto;

		outline: unset;
		border: unset;

		background: rgba(30,31,33,0.2);
		text-shadow: 0 0 2px rgb(0,0,0);

		font-size: 2.4rem;
		text-align: center;
		color: rgb(238,252,238);

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
