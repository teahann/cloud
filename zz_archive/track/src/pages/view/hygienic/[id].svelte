<script>
	import { getContext } from 'svelte'
	import Header from '~/components/view/Header.svelte'


	let data = getContext('activity')

</script>

{#await data}{:then activity}
	<div class="Hygienic View Form" >

		<Header activity={activity} />

		<div class="Completed">
			<h2>Items completed:</h2>
			{#each activity.data.tasks as task}
				<h3>{task}</h3>
			{/each}
		</div>

	</div>
{:catch err}
	<code>Error {err}</code>
{/await}
