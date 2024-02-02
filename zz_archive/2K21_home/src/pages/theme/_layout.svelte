<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { backgrounds } from '~/utils/session.ts'
	import { Store } from '~/utils/store.ts'

	let loading: Boolean = true

	onMount( async () => {
		backgrounds.set(await Store.backgrounds())
		loading = false
	})

</script>

{#if !loading}
	<slot />
{/if}
