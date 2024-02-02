import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async ({ params }) => {
  return { image: (await image(params.slug)) as Image[] };
};

const image = async (filename) => {
  const { data } = await supabase.from('images').select('*').eq('filename', filename).single();
  return data;
}