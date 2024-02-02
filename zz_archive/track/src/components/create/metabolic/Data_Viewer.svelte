<script>
	import { createEventDispatcher } from 'svelte'
	import { str_max } from '~/utils/string/max.js'
	import { full_name } from '~/utils/string/foods/full_name.js'
	export let activity

	const dispatch = createEventDispatcher()

	const measurements = ['miligrams', 'grams', 'milliliters', 'Liters']

	const hdl_tgl = item => {
		let element = document.getElementById(item.pid || item.fdcId)
		if (element) element.classList.toggle('Selected')
		dispatch('toggle', item)
	}

</script>


<table class="DataViewer" >
	{#if activity.data.foods.length || activity.data.compounds.length }
		<tr>
			<th class="Name" >Name</th>
			<th class="Quantity" title="Amount of units" >Quantity</th>
			<th class="Unit" title="Size of single serving" >Unit</th>
		</tr>
	{/if}
	<!-- Selected Foods -->
	{#each activity.data.foods as food}
		<tr class="Selectable" >
			<td class="Name" title={full_name(food)} >
				{str_max(food.description, 38)}
			</td>
			<td class="Quantity" >
				<input type="number" bind:value={food.quantity} />
			</td>
			<td class="Unit" >
				{#if food.foodMeasures.length > 0}
					<select bind:value={food.unit} >
						<option value="" disabled selected >Unset</option>
						{#each food.foodMeasures as unit}
							<option>{unit.disseminationText}</option>
						{/each}
					</select>
				{:else}
					<p>Serving</p>
				{/if}
			</td>
		</tr>
	{/each}
	<!-- Selected Compounds -->
	{#each activity.data.compounds as compound}
		<tr class="Selectable" >
			<td class="Name" >{compound.name}</td>
			<td class="Quantity" >
				<input type="number" bind:value={compound.quantity} />
			</td>
			<td class="Unit" >
				<select bind:value={compound.unit} >
					{#each measurements as unit}
						<option>{unit}</option>
					{/each}
				</select>
			</td>
		</tr>
	{/each}
</table>

