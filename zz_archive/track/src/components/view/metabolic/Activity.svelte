<script>
	import { writable } from 'svelte/store'
	import { str_max } from '~/utils/string/max.js'
	import { full_name } from '~/utils/string/foods/full_name.js'
	export let activity

	// TODO:: Editable quantity
	// TODO:: Add/remove items maybe?

</script>

<table class="Metabolic View Activity">
	<tr>
		<th>Name</th>
		<th class="Quantity">Quantity</th>
	</tr>
	{#each activity.data.foods as food}
		<tr>
			<td>{str_max(full_name(food), 64)}</td>
			<td class="Quantity" >{`${food.quantity} ${food.unit}`}</td>
		</tr>
	{/each}
	{#each activity.data.compounds as compound}
		<tr>
			<td>{`${compound.quantity} ${compound.unit}`}</td>
			<td>{compound.name}</td>
		</tr>
	{/each}
</table>
