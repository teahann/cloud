<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';

  export let name;
  
  let loading = true;
  const tag = writable({});
  let edited = {};

  onMount(() => get_tag())

  const get_tag = async() => {
    try {
      const { data, error } = await supabase.from('tag')
        .select('name, description').eq('name', name).eq('user_id', $user.id);
      if (error) {
        throw error;
      } else {
        tag.set(data[0]);
        edited = data[0];
      }
    } catch (err) {
      error_message = err.message;
    } finally {
      if (!$tag) window.location.assign('./index')
      loading = false;
    }
  };

  const update = async () => {
    try {
      const { data, error } = await supabase.from('tag')
        .update(edited).eq('name', name).eq('user_id', $user.id);
      if (error) { throw error } else { window.location.assign('./index') }
    } catch (err) {
      alert('Error while updating tag')
    }
  };

  const remove = async () => {
    if (window.confirm('Delete this tag?')) { 
      try {
        const { data, error } = await supabase.from('tag')
          .delete().eq('name', name).eq('user_id', $user.id);
        if (error) { throw error } else { window.location.assign('./index') }
      } catch (err) {
        alert('Error while deleting tag')
      }
    }
  };

  // Capitalize
  const readable = (s) => s.replace(/^./,c=>c.toUpperCase())

</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
  <div id="Edit">
    <h3>Editing {$tag.name}</h3>
    <table>
      {#each Object.entries(edited) as [key, value]}
        <tr>
          <th>{readable(key)}</th>
          <td><input type="text" bind:value={edited[key]}></td>
        </tr>
      {/each}
    </table>
    <div class="Actions">
      <button on:click={remove}>Delete</button>
      <button on:click={update}>Update</button>
    </div>
  </div>
{/if}