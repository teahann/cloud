import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async () => {
  return { celestials: (await celestials()) as Celestial[] }
};

const celestials = async () => {
  const { data } = await supabase.from('celestials').select('*').order('sun_au')
  return data
}
