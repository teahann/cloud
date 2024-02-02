<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { compounds } from '~/utils/session.ts'
	import { Store } from '~/utils/store.ts'

	let loading: Boolean = true

	// Get all compounds
	onMount( async () => {
		compounds.set(await Store.compounds())
		loading = false
	})

</script>

{#if !loading}
	<slot />
{/if}
