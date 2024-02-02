<!-- routify:options preload="proximity" -->
<script lang=ts>
	import { onMount } from 'svelte'
	import { goto } from '@roxi/routify'
	import { gpu_directory } from '~/utils/session.ts'
	import { Store } from '~/utils/store.ts'

	let loading: Boolean = true

	// Get all gpu items
	onMount( async() => {
		if (!navigator.gpu) {
			alert('WebGPU not supported')
			$goto('../')
		} else {
			gpu_directory.set(await Store.gpu_directory())
			loading = false
		}
	})

</script>

{#if !loading}
	<slot />
{/if}
