<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { params } from '@roxi/routify'

	import { Store } from '~/utils/store.ts'
	import { wavs } from '~/utils/session.ts'

	let loading: Boolean = true

	onMount( async () => {
		wavs.set(await Store.wavs_by_category($params.category))
		loading = false
	})

</script>

{#if !loading}
	<slot />
{/if}
