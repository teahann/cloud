<script>
	import { url } from '@roxi/routify'
	import { user_req } from '~/utils/session.ts'

	const clear_request = () => {
		user_req.set( new String() )
	}

</script>

<section>
	<button class="Row" on:click={clear_request} >Respawn</button>
</section>
