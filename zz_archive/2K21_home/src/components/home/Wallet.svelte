<script lang=ts>
	import { user_req } from '~/utils/session.ts'

	const pub_key: String = '82ruQgyPCBjgCf3WqKmKCcUCdRDj7cEwpXQZrZV9j88tJHqGwvJdZonZ8raRCUBtqXjnRQGrNm63ZEwopRRcn17v5FLdLZo'
	let copied: boolean = false;

	const copy_key = async () => {
		try {
			await navigator.clipboard.writeText(pub_key)
			copy_success()
		} catch (err) {
			console.error('Unable to copy to clipboard', err)
		}
	}

	const copy_notification = () => {
		copied = true
		setTimeout(() => {
			copied = false
		}, 1000);
	}

	// exit
	const clear_request = () => {
		user_req.set( new String() )
	}

</script>

<section>
	{#if !copied}
		<h2 class="Row">Donate!</h2>
	{:else}
		<h2 class="Row">Copied to clipboard</h2>
	{/if}
	<code class="Row" on:click={copy_notification} >
		{pub_key}
	</code>
	<button class="Row" on:click={clear_request} >
		Back
	</button>	
</section>

<style lang=scss>
	section {
		code {
			color: rgb(232,232,232);
			font-size: 8px;
			overflow: auto;
			cursor: pointer;
			&:hover { letter-spacing: 0.1px }
		}
	}
</style>
