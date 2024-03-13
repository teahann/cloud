<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';

  export let name;
  
  let loading = true;
  const compound = writable({});
  let edited = {};

  onMount(() => get_compound());

  const get_compound = async() => {
    try {
      const { data, error } = await supabase.from('compound')
        .select('name, chemspider_id, drugbank_id, chemicalbook_id, drugbank_id, chemicalbook_id,nist_id, wikipedia_id, pubchem_id, chembl_id, chebi_id, zinc_id')
        .eq('name', name).eq('user_id', $user.id);
      if (error) {
        throw error;
      } else {
        compound.set(data[0]);
        edited = data[0];
      }
    } catch (err) {
      error_message = err.message;
    } finally {
      if (!$compound) window.location.assign('./index')
      loading = false;
    }
  }
 
  const update = async () => {
    try {
      const { data, error } = await supabase.from('compound')
        .update(edited).eq('name', name).eq('user_id', $user.id);
      if (error) { throw error } else { window.location.assign('./index') }
    } catch (err) {
      alert('Error while updating compound')
    }
  };

  const remove = async () => {
    if (window.confirm('Delete this compound?')) { 
      try {
        const { data, error } = await supabase.from('compound')
          .delete().eq('name', name).eq('user_id', $user.id);
        if (error) { throw error } else { window.location.assign('./index') }
      } catch (err) {
        alert('Error while deleting compound')
      }
    }
  };

   // Remove '_id' and capitalize
  const readable = (s) => {
    return (s.endsWith('_id')?s.slice(0,-3):s).replace(/^./,c=>c.toUpperCase())
  }

</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
  <div id="Edit">
    <h3>Editing {name}</h3>
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