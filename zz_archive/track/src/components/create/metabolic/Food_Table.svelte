<script>
	import { createEventDispatcher } from 'svelte'
	import { str_max } from '~/utils/string/max.js'
	export let results, activity

	const dispatch = createEventDispatcher()
	const is_added = item => activity.data.foods.some(f => f.fdcId === item.fdcId)
	const hdl_tgl = item => {
		document.getElementById(item.fdcId).classList.toggle('Selected')
		dispatch('toggle', item)
	}

</script>

<table class="Foods">
	<tr>
		<th>Food</th>
		<th>Nutrients</th>
	</tr>
	{#each results as item}
		<tr id={item.fdcId}
			class="Selectable"
			on:click={() => hdl_tgl(item)}
			class:Selected={is_added(item)} >

			<td title={item.description} >
				<p title={item.description} >{str_max(item.description, 50)}</p>
				<p title={item.brandOwner} >{str_max(item.brandOwner, 50)}</p>
				<p title={item.foodCategory} >{str_max(item.foodCategory, 50)}</p>
			</td>
			<td class="Nutrients">
				{#each item.foodNutrients as nutrient}
					<p>{nutrient.nutrientName}</p>
				{/each}
			</td>

		</tr>
	{/each}
</table>
