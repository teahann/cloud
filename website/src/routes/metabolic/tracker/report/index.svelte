<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store'
  import { supabase } from '@/utils/supabase.js'
  import { user } from '@/utils/user.js'

  const user_reports = writable([])
  let loading = false;
  let error_message = null;

  onMount(() => get_user_reports())

  const get_user_reports = async() => {
    try {
      loading = true;
      const { data, error } = await supabase.from('report')
        .select('title, report_number').eq('user_id', $user.id)
      if (error) { throw error } else { user_reports.set(data) }
    } catch (err) {
      error_message = err.message;
    } finally {
      loading = false;
    }
  }

</script>

<div id="List">
  {#if error_message}
    <p class="Error">{error_message}</p>
  {/if}
  <a href="/metabolic/tracker/report/create" class="Add">Add new</a>
  <h5>Your reports</h5>
  {#each $user_reports as r}
    <a href={`/metabolic/tracker/report/edit/${r.report_number}`} class="Edit">{r.title}</a>
  {/each}
</div>
