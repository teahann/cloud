<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { wav_categories } from '~/utils/session.ts'
	import { Store } from '~/utils/store.ts'

	let loading: Boolean = true

	onMount( async () => {
		wav_categories.set(await Store.wav_categories())
		loading = false
	})

</script>

{#if !loading}
	<slot />
{/if}
