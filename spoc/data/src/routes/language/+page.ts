import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async () => {
  return { languages: (await languages()) as Language[] };
};

const languages = async () => {
  const { data } = await supabase.from('languages').select('name, year, url').order('name');
  return data;
}