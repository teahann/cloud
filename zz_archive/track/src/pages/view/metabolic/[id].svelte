<script>
	import { getContext } from 'svelte'

	import Header from '~/components/view/Header.svelte'
	import Analytics from '~/components/view/metabolic/Analytics.svelte'
	import Activity from '~/components/view/metabolic/Activity.svelte'

	const activity = getContext('activity')

	let view = 'totals'
	const total_items = data => data.foods.length + data.compounds.length

</script>

{#await activity}{:then activity}
	<div class="Metabolic View Form" >

		<Header activity={activity} />

		<div class="Tabs" >
			<button class="Selectable" class:Selected={view === 'totals'}
				on:click={() => view = 'totals'} >
				Totals
			</button>
			<button class="Selectable" class:Selected={view === 'activity'}
				on:click={() => view = 'activity'} >
				Items ({total_items(activity.data)})
			</button>
		</div>

		<div class="Totals">
			{#if view === 'totals'}
				<Analytics activity={activity} />
			{:else if view === 'activity'}
				<Activity activity={activity} />
			{/if}
		</div>

	</div>
{:catch err}
	<code>Error {err}</code>
{/await}
