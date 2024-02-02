import { createClient } from '@supabase/supabase-js'
import { PUBLIC_PSQL_API_URL, PUBLIC_PSQL_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_PSQL_API_URL, PUBLIC_PSQL_ANON_KEY)