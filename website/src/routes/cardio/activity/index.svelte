<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/stores'
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';

  onMount(() => get_activities()}

  const activities = writable([])

  const get_user_activities = async() => {
    try {
      loading.set(true)
      const { data, error } = supabase.from('cardio').select('title').eq('user_id', $user.id);
      if (error) { throw error } else { activities.set(data) }  
    } catch(err) {
      message = err.message
    } finally {
      loading.set(false)
      console.log($activities)
    }
  }

</script>

<div id="List" class="Activity">
  {#if message}<p class="Error">{message}</p>{/if}
  <a href="/cardio/activity/create">Create</a>
</div>
