<script lang=ts>
	import { url, params } from '@roxi/routify'
	import { Store } from '~/utils/store.ts'

	import Object from '~/components/solar/Object.svelte'
	import DbError from '~/components/DbError.svelte'

	const get_data = async () => {
		const response = await Store.celestial($params.id)
		if (response) {
			return response
		} else {
			throw new Error(text)
		}
	} 

	const request = get_data()

</script>


{#await request}{:then data}
	<Object data={data} />
{:catch error}
	<DbError />
{/await}

