<script>
	import { createEventDispatcher } from 'svelte'
	export let results, activity

	const dispatch = createEventDispatcher()
	const is_added = item => activity.data.compounds.some(c => c.pid === item.pid)
	const hdl_tgl = item => {
		document.getElementById(item.pid).classList.toggle('Selected')
		dispatch('toggle', item)
	}

</script>

<table class="Compounds">
	<tr>
		<th>Name</th>
		<th>Category</th>
	</tr>
	{#each results as compound}
		<tr id={compound.pid} class="Selectable"
			on:click={() => hdl_tgl(compound)}
			class:Selected={is_added(compound)} >
			<td>{compound.name}</td>
			<td>{compound.category}</td>
		</tr>
	{/each}
</table>
