<script lang=ts>
	import { user_req } from '~/utils/session.ts'

	import Background from '~/components/theme/Background.svelte'
	import List from '~/components/theme/List.svelte'
	import UserInput from '~/components/theme/UserInput.svelte'
	import UserError from '~/components/UserError.svelte'

</script>

<List />

{#if ['background','bg'].includes($user_req)}
	<Background />
{:else if $user_req.length < 10}
	<UserInput />
{:else}
	<UserError />
{/if}
