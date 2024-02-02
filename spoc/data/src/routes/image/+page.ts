import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async () => {
  return { images: (await images()) as Image[] };
};

const images = async () => {
  const { data } = await supabase.from('images').select('*').order('name');
  return data;
};