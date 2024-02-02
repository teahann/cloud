<script lang=ts>
	import { onMount } from 'svelte'
	import { url, params, goto } from '@roxi/routify'
	
	import { user_req, greetings, commands } from '~/utils/session.ts'

	let html_focus: HTMLInputElement
	let user_input: String = new String()

	let gi: Number = Math.floor(Math.random() * $greetings.length)

	/* --- initialize --- */
	onMount(() => {
		check_params()
		setTimeout(() => html_focus.focus(), 333)
	})

	/* --- load params from URL --- */
	const check_params = () => {
		let param_req = Object.keys($params)[0]
		if (param_req) {
			user_req.set(param_req)
			user_input = param_req
			// clear request from URL
			let fixed_url = location.search.replace(/[\?&][^&]+/, '').replace(/^&/, '?')
			history.replaceState && history.replaceState(null, '', location.pathname + fixed_url)
		}
	}	

	$: user_input, react()

	const react = () =>{
		user_req.set(user_input.toLowerCase())
		check_greetings()
		check_routes()
		check_links()
	}

	const check_greetings = () => {
		$greetings.forEach(item => {
			let words = item.greeting.replace(/[()]/g, '').split(' ')
			words.some(word => {
				if (word.toLowerCase() === $user_req) {
					random_greeting()
					clear_input()
				}
			})
		})
	}

	const random_greeting = () => {
		gi = Math.floor(Math.random() * $greetings.length)
	}

	const routes = $commands.filter(c => c.has_module)
	const check_routes = () => {
		routes.forEach(c => {
			if (c.name.toLowerCase() === $user_req) {
				$goto(`./${$user_req}`)
			}
		})
	}

	const links = $commands.filter(c => c.external_link)
	const check_links = () => {
		links.forEach(c => {
			if (c.name.toLowerCase() === $user_req) {
				window.open(c.external_link)
				clear_input()
			}
		})
	}

	const clear_input = () => {
		user_input = new String()
		user_req.set(new String())
	}

</script>


<section>

	<h2 class="Row"
		on:click={random_greeting}
		title={Object.values($greetings[gi])[2]} >
		{Object.values($greetings[gi])[1]}
	</h2>

	<input class="Row"
		type="text"
		bind:this={html_focus}
		bind:value={user_input}
	/>

</section>
