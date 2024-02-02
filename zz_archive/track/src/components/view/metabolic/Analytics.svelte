<script>
	import { writable } from 'svelte/store'
	import { decimal_max } from '~/utils/number/decimal_max.js'
	export let activity

	// TODO:: Factor in custom compounds tracked to totals
	// TODO:: Calculate totals while factoring in serving sizes

	const calc_compounds = activity => {
		let map = new Map()
		activity.data.foods.forEach(food => {
			food.foodNutrients.forEach(nutrient => {
				let exists = map.get(nutrient.nutrientId)
				exists ?
					exists.value += nutrient.value :
					map.set(nutrient.nutrientId, init_compound(nutrient))
			})
		})
		let compounds = Array.from(map.values());
		return clean_data(compounds)
	}

	const clean_data = compounds => compounds.sort((a, b) => a.unit.localeCompare(b.unit))

	const init_compound = nutrient => {
		return {
			name: nutrient.nutrientName,
			value: nutrient.value,
			unit: nutrient.unitName
		}
	}

	const compounds = writable(calc_compounds(activity))

</script>

<table class="Metabolic View Analytics">
	<tr>
		<th>Compound</th>
		<th class="Quantity" >Quantity</th>
	</tr>
	{#each $compounds as compound}
		<tr>
			<td>{compound.name}</td>
			<td class="Quantity" title={`${compound.value} ${compound.unit}`} >
				{decimal_max(compound.value, 4)} {compound.unit}
			</td>
		</tr>
	{/each}
</table>
