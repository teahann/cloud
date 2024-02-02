<script>
	import { params, goto } from '@roxi/routify'
	import { get_id } from '~/data/ActivitiesIDB.js'
	
	const id = parseInt($params.id)

	get_id(id).then(res => res.id ? $goto(hdl_url(res)) : $goto('/'))
	
	const hdl_url = item => `./${item.type.toLowerCase()}/${item.id}`

</script>
