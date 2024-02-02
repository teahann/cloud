<script>
	import { user_req } from '~/utils/session.ts'

	import List from '~/components/language/List.svelte'
	import UserInput from '~/components/language/UserInput.svelte'
	import UserError from '~/components/UserError.svelte'

</script>


<section>
	{#if $user_req.length <= 14}
		<UserInput />
	{:else}
		<UserError />
	{/if}
	<List />
</section>
