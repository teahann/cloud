<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store'
  import { supabase } from '@/utils/supabase.js'
  import { user } from '@/utils/user.js'

  const user_tags = writable([])
  let loading = false;
  let error_message = null;

  onMount(() => get_user_tags())

  const get_user_tags = async() => {
    try {
      loading = true;
      const { data, error } = await supabase.from('tag')
        .select('name').eq('user_id', $user.id)
      if (error) { throw error } else { user_tags.set(data) }
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
  <a href="/metabolic/tag/create">Add new</a>
  <h5>Your tags</h5>
  {#each $user_tags as tag}
    <a href={`/metabolic/tag/edit/${tag.name}`} class="Edit">{tag.name}</a>
  {/each}
</div>
