<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { goto, url } from '@roxi/routify'
	import { init_db, get_all } from '~/data/ActivitiesIDB.js'
	import { date_readable } from '~/utils/date/readable.js'

	const activities = writable([])
	onMount(() => get_all().then( data => activities.set(data)))
	
</script>

<div class="Home" >
	<a href={ $url('./create') } >Add new</a>
	<table>
		{#if $activities.length > 0}
			<tr>
				<th>Type</th>
				<th>Date</th>
			</tr>
		{/if}
		{#each $activities as activity}
			<tr class="Selectable" title="View or update activity"
				on:click={() => $goto( `./view/${activity.id}` ) } >
				<td>{activity.type}</td>
				<td>{date_readable(activity.time)}</td>
			</tr>
		{/each}
	</table>
</div>
