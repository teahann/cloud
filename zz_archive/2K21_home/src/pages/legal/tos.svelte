<script>
	import { url } from '@roxi/routify'

</script>


<section>
	<h2 class="Row Intro" >	Terms of Service</h2>
	<p class="Row" >Services are purposefully designed for minimized data use and to not be shared with 3rd parties.</p>
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
