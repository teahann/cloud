<script>
	import { url, goto } from '@roxi/routify'
	import { supabase } from '~/utils/supabaseClient.ts'
	import { user_auth, user_data } from '~/utils/session.ts'

	console.log($user_data)

	// add later
	const logout = async () => {
		const { error } = await supabase.auth.signOut()
		$goto('../')
	}
</script>


<section>
	<h2 class="Row" title={$user_data.email}>
		<img src={$user_data.picture} alt="Profile" >
		{$user_data.name}
	</h2>
	<p class="Row">No features ready yet 😳</p>
	<button class="Row" on:click={logout}>Sign out</button>
</section>

<style lang=scss>
	section {

		h2 {
			display: flex;
			justify-content: center;
			font-size: 2.2rem;
			line-height: 2.5rem;
			padding: 1.5rem 0;
			color: rgba(242,242,242,0.8);

			img {
				padding: 0 24px;
				max-height: 2.5rem;
			}
		}

		p {
			font-size: 1.15rem;
			color: rgba(242,242,242,0.7);
		}
	}
</style>
