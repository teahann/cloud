import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async () => {
  return { jobs: (await jobs()) as Job[] };
};

const jobs = async () => {
  const { data } = await supabase.from('jobs').select('*').order('salary', { ascending: false });
  return data;
}