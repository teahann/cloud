<script>
	import { new_activity } from '~/data/new_activity.js'
	import Header from '~/components/create/Header.svelte'

	const activity = new_activity('Hygienic', { 'tasks': [] })

	const choices = {
		'Hair': [ 'Brush', 'Wet', 'Shampoo', 'Condition', 'Other'],
		'Face': [ 'Wash', 'Makeup', 'Moisturize', 'Shave', 'Pluck' ],
		'Teeth': [ 'Brush', 'Floss' ],
		'Body': [ 'Shower', 'Moisturize' ]
	}

	const tgl = (task, category) => {
		let item = `${task} ${category}` 
		let not_added = !activity.data.tasks.includes(item)
		activity.data.tasks = not_added ? add(item) : sub(item)
		document.getElementById(`${task}${category}`).classList.toggle('Added')
	}

	const add = item => [...activity.data.tasks, item ]
	const sub = item => activity.data.tasks.filter(task => task !== item)

</script>

<div class="Hygienic Create Form">

	<Header activity={activity} />

	<div class="Grid">
		{#each Object.keys(choices) as category}
			<div class="Category">
				<h3>{category}</h3>
				{#each choices[category] as task}
					<button id={`${task}${category}`}
						on:click={() => tgl(task, category)} >
						{task}
					</button>
				{/each}
			</div>
		{/each}
	</div>

</div>
