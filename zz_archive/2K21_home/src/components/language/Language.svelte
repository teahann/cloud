<!-- Single row viewer -->
<script lang=ts>
	import { url } from '@roxi/routify'

	export let data

</script>


<section>

	<h2 class="Row" title={data.category} >
		{data.name} ({data.year})
	</h2>

	{#if data.note}
		<code class="Row">{data.note}</code>
	{/if}

	<a href={ $url('./index') } class="Row" >
		Back
	</a>

</section>


<style lang=scss>
	code {
		line-height: 2rem;
		padding: 0.5rem 0;
		color: rgb(242,242,242);
	}
</style>
