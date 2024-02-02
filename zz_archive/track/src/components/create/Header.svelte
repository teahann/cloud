<script>
	import { getContext } from 'svelte'
	import { url, goto } from '@roxi/routify'
	import { insert } from '~/data/ActivitiesIDB.js'
	export let activity

	const db = getContext('db')
	const dbLoading = getContext('db:loading')

	let date = activity.time.substr(0,10);
	let time = activity.time.substr(11,5);

    $: activity.time = `${date}T${time}:00.000Z`

	const save_activity = () => {
		insert(activity)
			.then(msg => $goto('../../'))
			.catch(err => console.error(err))
	}

</script>

<header class="Create" >
	<a class="Back" href={ $url('../') } >Back</a>
	<h2 class="Title" >{activity.type}</h2>
	<div class="Datetime">
		<input type="date" bind:value={date} />
		<input type="time" bind:value={time} />
	</div>
	<button class="Save" on:click={save_activity} >Save</button>
</header>
