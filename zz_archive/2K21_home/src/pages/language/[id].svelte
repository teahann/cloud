<script lang=ts>
	import { url, params } from '@roxi/routify'
	import { Store } from '~/utils/store.ts'
	import Language from '~/components/language/Language.svelte'
	import DbError from '~/components/DbError.svelte'

	const get_data = async () => {
		const response = await Store.language($params.id)
		if (response) {
			return response
		} else {
			throw new Error(text)
		}
	} 

	const request = get_data()

</script>


{#await request}{:then data}
	<Language data={data} />
{:catch error}
	<DbError />
{/await}

