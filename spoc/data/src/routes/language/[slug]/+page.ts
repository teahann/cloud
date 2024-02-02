import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async ({ params }) => {
  return { language: (await language(params.slug)) as Language[] };
};

const language = async (name) => {
  const { data } = await supabase.from('languages').select('*').ilike('name', name).single();
  return data;
}