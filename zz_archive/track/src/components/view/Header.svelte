<script>
	import { url, goto } from '@roxi/routify'
	import { update_id, delete_id } from '~/data/ActivitiesIDB.js'
	import { date_readable } from '~/utils/date/readable.js'
	export let activity

	const update_activity = () => {
		update_id(activity_id, edit_buffer)
			.then(() => console.log('Updated activity'))
			.catch(err => console.error(err))
	}

	const remove_activity = () => {
		if (confirm('Remove this activity from database?') == true) {
			delete_id(activity.id)
				.then(() => $goto('/'))
				.catch(err => console.log(err))
		}
	}

	let editing = false
	const tgl_editing = () => alert('Edit feature not ready')
	// const tgl_editing = () => editing = !editing

</script>

<header class="View" >
	<a class="Back" href={ $url('/') } >Back</a>
	<h3>{activity.type} {date_readable(activity.time, 'day_only')}</h3>
	<!-- <button class="Edit" on:click={tgl_editing} >Edit</button> -->
	<button class="Delete" on:click={remove_activity} >Delete</button>
</header>
