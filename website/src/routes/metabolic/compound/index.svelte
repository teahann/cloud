<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store'
  import { supabase } from '@/utils/supabase.js'
  import { user } from '@/utils/user.js'

  const user_compounds = writable([])
  const report_compounds = writable([])
  let loading = false;
  let error_message = null;

  onMount(() => get_user_compounds())

  const get_user_compounds = async() => {
    try {
      loading = true;
      const { data, error } = await supabase.from('compound').select('name').eq('user_id', $user.id)
      if (error) { throw error } else { user_compounds.set(data) }
    } catch (err) {
      error_message = err.message;
    } finally {
      loading = false;
    }
  }

</script>

<div id="List" class="Compounds">
  {#if error_message}
    <p class="Error">{error_message}</p>
  {/if}
  <a href="/metabolic/compound/create" class="Add">Add new</a>
  <h5>Your compounds</h5>
  {#each $user_compounds as c}
    <a href={`/metabolic/compound/edit/${c.name}`} class="Edit">{c.name}</a>
  {/each}
  {#if $report_compounds.length}
    <h5>Report compounds</h5>
  {/if}
</div>
