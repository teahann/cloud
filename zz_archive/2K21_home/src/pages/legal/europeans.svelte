<script lang=ts>
	import { url } from '@roxi/routify'

</script>


<section>

	<h2 class="Row" >Country laws/regulations</h2>
	
	<h2 class="Row" >
		Should your governing jurisdiction disapprove of our data privacy policies or terms of service, kindly notify us. We shall take necessary measures to restrict access from that location.
	</h2>

	<a href={ $url('./index') } class="Row" >
		Back
	</a>

</section>


<style lang=scss>
	section {

		.Row {
			line-height: 1.6rem;
			font-size: 1.4rem;
			padding: 0.5rem 0;
			font-weight: 100;
			letter-spacing: 1px;

			&:hover {
				width: 720px;
				max-width: calc(100vw - 8px);
			}
		}
	}
</style>
