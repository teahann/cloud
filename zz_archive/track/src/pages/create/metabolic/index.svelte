<!--
	activity.data.foods = [https://fdc.nal.usda.gov]
	activity.data.compounds.pid = [https://pubchem.ncbi.nlm.nih.gov]
 -->
<script>
	import { onMount } from 'svelte'
	import { url } from '@roxi/routify'
	import { writable } from 'svelte/store'
	import { get_compounds } from '~/data/Supabase.js'
	import { new_activity } from '~/data/new_activity.js'
	import { str_match } from '~/utils/string/match.js'
	
	import Header from '~/components/create/Header.svelte'
	import Compound_Table from '~/components/create/metabolic/Compound_Table.svelte'
	import Data_Viewer from '~/components/create/metabolic/Data_Viewer.svelte'
	import Food_Table from '~/components/create/metabolic/Food_Table.svelte'
	import load_animation from '~/assets/load_animation.svg';

	// -- Object to nsert ------
	const activity = new_activity('Metabolic', { 'foods': [], 'compounds': [] })

	// -- Activity.data sources ------
	const FOODS_API = import.meta.env.VITE_FOODS_API
	let compounds
	onMount(async () => compounds = await get_compounds())

	// -- Session ------	
	const foods_res = writable(new Array())
	const compounds_res = writable(new Array())
	let food_req = new String() 
	let comp_req = new String()
	let view_tbl = new String()
	let loading = false
	let timer_i = new Number()
	const fetch_delay = 256

	// -- Get foods -----
	const search_foods = () => {
		clearTimeout(timer_i);
		timer_i = setTimeout(async () => {
			if (!food_req.length) {
				foods_res.set(new Array())
				return
			}
			loading = true
			try {
				const res = await fetch(FOODS_API, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 'query': food_req })
				})
				if (!res.ok) throw new Error(`HTTP error! ${res.status}`)
				const data = await res.json()
				foods_res.set(data.foods)
			} catch (error) {
				hdl_err(error)
			} finally {
				loading = false
			}
		}, fetch_delay)
	}

	const hdl_err = err => {
		if (err.message.includes("500")) alert('FoodData Central API error')
	}

	// -- Get compounds ------
	const search_compounds = () => {
		loading = true
		let results = compounds.filter(comp => str_match(comp.name, comp_req))
		compounds_res.set(results)
		loading = false
	}

	// -- Add || Subtract item from activity.data ------
	const tgl_obj = (event) => {
		let item = event.detail
		let id = item.pid || item.fdcId
		let key = item.pid ? 'compounds' : 'foods'
		let added = activity.data[key].find(e => e.pid === id || e.fdcId === id)
		activity.data[key] = added ? 
			activity.data[key].filter(i => i.pid !== id && i.fdcId !== id) : 
			[...activity.data[key], { ...item, quantity: 1, unit: '' } ]
	}

</script>

<div class="Metabolic Create Form">

	<Header activity={activity} />

	<div class="Search" >
		<input bind:value={comp_req}
			placeholder="Search compounds"
			on:keyup={search_compounds}
			on:focus={() => view_tbl = 'compound'}
		/>
		<input
			bind:value={food_req}
			placeholder="Search foods"
			on:keyup={search_foods}
			on:focus={() => view_tbl = 'food'}
		/>
	</div>

	<div class="Results">

		{#if loading}
			<div class="Loading Create Metabolic" >
				<div class="Message">
					<p>Fetching results…</p>
					<img src={load_animation} alt="Loading" />
				</div>
			</div>
		{/if}

		{#if view_tbl === 'compound'}
			{#if $compounds_res.length > 0}
				<Compound_Table
					results={$compounds_res}
					activity={activity}
					on:toggle={tgl_obj}
				/>
			{:else}
				<div class="NoResults">
					<h2>Enter compound name</h2>
				</div>
			{/if}
		{:else if view_tbl === 'food'}
			{#if $foods_res.length > 0}
				<Food_Table
					results={$foods_res}
					activity={activity}
					on:toggle={tgl_obj}
				/>
			{:else}
				<div class="NoResults">
					<h2>Enter food name</h2>
				</div>
			{/if}
		{/if}

	</div>

	<div class="Data">
		<Data_Viewer activity={activity} on:toggle={tgl_obj} />
	</div>

</div>
