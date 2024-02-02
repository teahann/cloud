<script>
	import { url } from '@roxi/routify'

</script>


<section>
	<h2 class="Row Intro" >Privacy Policy</h2>
	<p class="Row" >I don't want your data</p>
	<a href={$url('./index')} class="Row Exit" >Back</a>
</section>

<style lang=scss>
	section {

		p {
			color: rgb(252,252,252);
		}

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
