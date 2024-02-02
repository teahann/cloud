<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { url } from '@roxi/routify'

	import { user_auth, user_data } from '~/utils/session.ts'
	import { supabase } from '~/utils/supabaseClient'

	onMount( async () => {
		supabase.auth.getSession().then(({ data }) => {
			user_auth.set(data.session)
			user_data.set(data.session.user.user_metadata)
		})
	})

	const providers = [ 'Discord']

	const login = async (company) => {
		const { data, error } = await supabase
			.auth.signInWithOAuth({ provider: company.toLowerCase() })
	}

</script>

{#if !$user_auth}
	<section>
		<h2 class="Row">Login with</h2>
		{#each providers as provider}
			<button class="Row" on:click={() => login(provider)}>
				{provider}
			</button>
		{/each}
		<a class="Row" href={$url('../')} >Back</a>
	</section>
{:else}
	<slot />
{/if}
