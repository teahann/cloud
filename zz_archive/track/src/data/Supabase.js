import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function get_compounds() {
	const { data } = await supabase.from('compounds').select('pid, name, category').order('category')
	return data
}
