<script lang=ts>
	import { url } from '@roxi/routify'
	import { user_req, gpu_directory } from '~/utils/session.ts'

	// Components
	import UserInput from '~/components/gpu/UserInput.svelte'
	import UserError from '~/components/UserError.svelte'
	import List from '~/components/gpu/List.svelte'

	// GPU modules
	import GameOfLife from '~/components/gpu/gameoflife/index.svelte'

</script>


{#if $user_req === 'Game of Life'}
	<GameOfLife />
{/if}

<section>
	{#if $user_req.length <= 14}
		<UserInput />
	{:else}
		<UserError />
	{/if}
	<List />
</section>
