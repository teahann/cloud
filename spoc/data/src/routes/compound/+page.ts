import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async () => {
  return { compounds: (await compounds()) as Compound[] };
};

const compounds = async () => {
  const { data } = await supabase.from('compounds').select('*').order('name');
  return data;
};
