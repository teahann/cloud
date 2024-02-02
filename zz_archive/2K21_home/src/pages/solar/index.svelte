<script lang=ts>
	import { goto } from '@roxi/routify'
	import { user_req, solar_system } from '~/utils/session.ts'	

	import List from '~/components/solar/List.svelte'
	import UserInput from '~/components/solar/UserInput.svelte'
	import UserError from '~/components/UserError.svelte'

	$: $user_req, react()
	const react = () => {
		if (['home','back','exit'].includes($user_req)) {
			$goto(`../`)	
		}
		$solar_system.some(obj => {
			if (obj.name.toLowerCase() === $user_req.toLowerCase()) {
				user_req.set(new String())
				$goto(`./${obj.id}`)
			}
		})
	}

</script>


<section>
	{#if $user_req.length <= 14}
		<UserInput />
	{:else}
		<UserError />
	{/if}
	<List />
</section>

<style>
	section {
		max-width: 800px;
		margin: 0 auto;
	}
</style>
