<script lang=ts>
	import { goto } from '@roxi/routify'

	let user_input: string = new String()
	const yt_search_url: string = 'https://youtube.com/results?search_query='

	const search_yt = () => {
		let full_link = yt_search_url + user_input
		window.open(full_link)
	}

</script>

<header>
	<input type='Text' bind:value={user_input} />
	<button on:click={search_yt} >Search</button>
</header>


<style lang=scss>
	header {
		display: flex;
		grid-gap: 4px;
		justify-content: center;
		width: calc(100dvw - 14px);
		border-radius: 0 0 4px 4px;
		margin: 0 auto;
		max-width: 600px;
		backdrop-filter: blur(24px);
		background: rgba(30,31,33,0.7);
		padding: 4px;

		input, button {
			outline: unset;
			border: unset;
			background: unset;

			border-radius: 4px;
			line-height: 3rem;
			font-size: 1.5rem;
			color: rgb(238,238,238);
			
			&:hover {
				box-shadow: 0 0 3px 2px rgba(128,128,128,0.5) inset;
				color: rgb(252,252,252);
			}
		}

		input {
			width: 100%;
			text-align: center;
		}

		button {
			cursor: pointer;
			padding: 0 24px;
		}

	}
</style>
