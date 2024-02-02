<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { yt_vids } from '~/utils/session.ts'
	import { Store } from '~/utils/store.ts'

	let loading: Boolean = true

	onMount( async () => {
		yt_vids.set(await Store.yt_vids())
		loading = false
	})

</script>

{#if !loading}
	<slot />
{/if}
