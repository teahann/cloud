import { createClient } from '@supabase/supabase-js'
import { loading } from './loading.js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export const register = async(user_input) => {
  try {
    loading.set(true)
    const { error } = await supabase.auth.signUp(user_input);
    if (error) throw error;
  } catch (err) {
    console.error(err.message);
  } finally {
    loading.set(false)
  }
};

export const login = async(user_input) => {
  try {
    loading.set(true)
    const { error } = await supabase.auth.signInWithPassword(user_input);
    if (error) { throw error } else { close_modal() }
  } catch (err) {
    console.error(err.message);
  } finally {
    loading.set(false)
  }
};

export const signout = async() => {
  try {
    loading.set(true)
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (err) {
    console.error(err.message);
  } finally {
    loading.set(false)
  }
}