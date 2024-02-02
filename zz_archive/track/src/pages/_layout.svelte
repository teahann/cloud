<!-- routify:options preload="proximity" -->
<script>
	import { setContext } from 'svelte'
	import { init_db, db } from '~/data/ActivitiesIDB.js'

	let ready_db = init_db()
	setContext('db', db)

</script>

{#await ready_db}
	<code>Loading data</code>
{:then}
	<slot />
{/await}
