import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async ({ params }) => {
  return { celestial: (await celestial(params.slug)) as Celestial[] }
};

const celestial = async (name) => {
  const { data } = await supabase.from('celestials').select('*').ilike('name', name).single()
  return data
}
