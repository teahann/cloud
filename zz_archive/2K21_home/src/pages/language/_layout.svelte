<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { languages } from '~/utils/session.ts'
	import { Store } from '~/utils/store.ts'

	let loading: Boolean = true

	// Get all compounds
	onMount( async () => {
		languages.set(await Store.languages())
		loading = false
	})

</script>

{#if !loading}
	<slot />
{/if}
