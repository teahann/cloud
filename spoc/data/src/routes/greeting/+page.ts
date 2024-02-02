import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async () => {
  return { greetings: (await greetings() )as Greeting[] };
};

const greetings = async () => {
  const { data } = await supabase.from('greetings').select('*')
  return data
}
