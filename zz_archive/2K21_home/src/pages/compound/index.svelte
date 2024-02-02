<script lang=ts>
	import { url } from '@roxi/routify'

	import { user_req, compounds } from '~/utils/session.ts'

	import UserInput from '~/components/compound/UserInput.svelte'
	import UserError from '~/components/UserError.svelte'
	import List from '~/components/compound/List.svelte'

</script>


<section>
	{#if $user_req.length <= 14}
		<UserInput />
	{:else}
		<UserError />
	{/if}
	<List />
</section>

