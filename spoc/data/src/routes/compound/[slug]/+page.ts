import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async ({ params }) => {
  return { compound: (await compound(params.slug)) as Compound[] };
};

const compound = async (name) => {
  const { data } = await supabase.from('compounds').select('*').ilike('name', name).single()
  return data
}