<script>
  import { onMount } from 'svelte';
  import { loading } from '@/utils/loading.js';
  import { user } from '@/utils/user.js';

  let edited = {}
  let message = ''

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

<div id="Edit" class="Activity">
  {#if message}<p class="Error">{message}</p>{/if}
  <h3>- Create new activity form -</h3>
</div>
