<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { solar_system } from '~/utils/session.ts'
	import { Store } from '~/utils/store.ts'

	let loading: Boolean = true

	onMount( async () => {
		solar_system.set(await Store.solar_system())
		loading = false
	})

</script>

{#if !loading}
	<slot />
{/if}
