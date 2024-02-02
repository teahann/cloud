<!-- 🆓💬davincichat -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { url } from '@roxi/routify'

	import { openai } from '~/utils/openaiClient.ts'

	const messages = writable<Array<string>>(new Array())
	let user_input: String = new String()
	let html_focus: HTMLInputElement

	onMount(() => setTimeout(() => { html_focus.focus() }, 333))

	async function send_question() {
		if (user_input.length < 1) return false

		let user_msg = user_input;
		user_input = new String();
		
		add_msg('Human', user_msg);
		
		try {
			const res = await openai.createCompletion({
				model:  "text-davinci-003",
				prompt: user_msg,
				max_tokens: 1023
			})
			add_msg('AI', res.data.choices[0].text)
		} catch (error) {
			add_msg('Server', `Error 😐 ${error.message}`)
		}

	}

	const add_msg = (name, msg) => {
		const new_msg = { user: name, text: msg }
		messages.update( msgs => msgs = [ ...msgs, new_msg ] )
	} 

	// submit on enter
	const check_send = (e) => {
		if (e.keyCode === 13) {
			send_question()
		}
	}

	const clear_messages = () => {
		messages.set(new Array())
	}
	
</script>

<svelte:window on:keydown={check_send} />

<header>
	<code>Davinci</code>
	<a href={ $url('../') } >Back</a>
	{#if $messages.length > 0}
		<button on:click={clear_messages} >
			Clear
		</button>
	{/if}
</header>

<section>
	{#each $messages as message}
		<p class="Row" >
			{message.user}: {message.text}
		</p>
	{/each}
	<input
		class="Row"
		bind:value={user_input}
		bind:this={html_focus}
	/>
	{#if user_input.length > 1}
		<button class="Row" on:click={() => send_question()} >
			Send
		</button>
	{/if}
</section>

<style lang=scss>
	header {
		top: 0;
		position: sticky;
		display: flex;
		z-index: 3;

		code, button, a {
			cursor: pointer;

			text-align: center;
			line-height: 2.6rem;
			font-size: 1.6rem;
			padding:  8px;
			min-width: 15vw;

			background: rgba(0,0,0,0.4);
			backdrop-filter: blur(24px) saturate(0.84);
			color: rgb(242,222,232);
			transition: 0.12s all ease-in-out;
			&:hover {
				color: rgb(252,252,252);
			}
		}

		button {
			cursor: pointer;

			border: unset;
			outline: unset;
			margin: unset;
		
			&:hover {
				background: rgba(240,240,240,0.05);
			}
		}
	} // end of header

	section {
		margin: 2px 0;
		min-height: calc(100vh - 2.6rem - 24px);

		.Row {
			width: calc(100vw - 28px);
			max-width: 800px;
			&:hover {


			}
		}

		p {
			word-break: break-all;
			cursor: default;
			font-size: 1.15rem;
			line-height: 2rem;
			color: rgb(232,232,232);
			padding: 0 4px;
		}

		input, button {
			font-size: 2rem;
			line-height: 4rem;
		}
	}
</style>
