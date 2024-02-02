<!-- routify:options preload="proximity" -->
<script>
	import { setContext } from 'svelte'
	import { params } from '@roxi/routify'
	import { get_id } from '~/data/ActivitiesIDB.js'

	let activity = get_id(parseInt($params.id))
	setContext('activity', activity)

</script>

{#await activity}
	<code>Loading activity</code>
{:then}
	<slot />
{/await}
