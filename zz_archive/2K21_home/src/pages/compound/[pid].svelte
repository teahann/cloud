<script lang=ts>
	import { url, params } from '@roxi/routify'
	import { Store } from '~/utils/store.ts'

	import Viewer from '~/components/compound/Viewer.svelte'
	import DbError from '~/components/DbError.svelte'

	const get_data = async () => {
		const response = await Store.compound($params.pid)
		if (response) {
			return response
		} else {
			throw new Error(text)
		}
	} 

	const request = get_data()

</script>


{#await request}{:then data}
	<Viewer data={data} />
{:catch error}
	<DbError />
{/await}
