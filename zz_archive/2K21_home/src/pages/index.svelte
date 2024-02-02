<script lang=ts>
	import { onMount } from 'svelte'
	import { goto } from '@roxi/routify'

	// DB interface
	import { Store } from '~/utils/store.ts'
	import { supabase } from '~/utils/supabaseClient'

	// components
	import { List, Chill, UserInput, Wallet	} from '~/components/home/index.ts'
	import UserError from '~/components/UserError.svelte'

	import { commands, greetings, user_req, user_auth } from '~/utils/session.ts'

	// onload (all pages)
	let loading: Boolean = true
	onMount(async () => {
		await check_login()
		await init_data()
		loading = false
	})

	const check_login = async() => {
		// get db interface session
		supabase.auth.getSession().then(({ data }) => {
			if (data.session !== null) {
				$goto('./user')
			}
		})
	}

	const init_data = async () => {
		greetings.set(await Store.greetings())
		commands.set(await Store.commands())
	}

</script>

{#if !loading}
	{#if ['idle','exit','chill'].includes($user_req)}
		<Chill />
	{:else}
		<List />
		{#if ['donate','wallet','xmr'].includes($user_req)}
			<Wallet />
		{:else if $user_req.length <= 14}
			<UserInput />
		{:else}
			<UserError />
		{/if}	
	{/if}
{/if}
 