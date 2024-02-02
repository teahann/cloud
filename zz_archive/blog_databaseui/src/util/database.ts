import { createClient } from '@supabase/supabase-js'

class Database {
  constructor() {
    const host_url = import.meta.env.VITE_READ_KEY;
    const read_key = import.meta.env.VITE_API_URL;
    this.db = createClient(read_key, host_url);
  }

  async get_all() {
    const { data } = await this.db
      .from('blogs')
      .select('id, date, title')
      .order('date', { ascending: false });
    return data;
  }
  
  async get_id(id){
    const { data } = await this.db
      .from('blogs')
      .select('title, date, content')
      .eq('id', id)
      .single();
    return data;
  }
}

export default Database;