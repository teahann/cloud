<script lang=ts>
	export let data
	import { url } from '@roxi/routify'

	// Do in db?
	const pages = [
		['Terms of Service','tos'],
		['Privacy','privacy'],
		['Europe...','europeans'],
		['Back','../']
	]

</script>


<section>
	<h2	class="Row" >Legal stuff</h2>

	{#each pages as [title, link] }
		<a href={ $url(`./${link}`) } class="Row" >{title}</a>
	{/each}

</section>
