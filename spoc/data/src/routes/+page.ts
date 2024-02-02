import type { PageLoad } from "./$types";
import { supabase } from '$lib/db.ts'

export const load: PageLoad = async () => {
  return { commands: (await commands()) as Commands[] }
};

const commands = async () => {
    const { data } = await supabase.from('commands').select('*').order('name')
    return data
}
