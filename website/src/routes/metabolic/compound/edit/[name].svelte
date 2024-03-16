<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Tags_Modal from '@/components/Tags_Modal.svelte';
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';

  export let name;
  
  const user_tags = writable([])
  const filtered_tags = writable([])
  let loading = true;
  let view_tag_editor = false;
  let tag_editor_search = '';
  const compound = writable({});
  let edited = {};

  onMount(() => {
    get_compound()
    get_user_tags()
  });

  const get_compound = async() => {
    try {
      const { data, error } = await supabase.from('compound')
        .select('name, chemspider_id, drugbank_id, chemicalbook_id, drugbank_id, chemicalbook_id,nist_id, wikipedia_id, pubchem_id, chembl_id, chebi_id, zinc_id, tags')
        .eq('name', name).eq('user_id', $user.id);
      if (error) {
        throw error;
      } else {
        if (typeof data[0].tags == 'undefined') data[0].tags = new Array()
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

  const get_user_tags = async() => {
    try {
      loading = true;
      const { data, error } = await supabase.from('tag')
        .select('name').eq('user_id', $user.id)
      if (error) {
        throw error;
      } else {
        if (!edited.tags) edited.tags = []
        user_tags.set(data);
        filtered_tags.set(data)
      }
    } catch(err) {
      error_message = err.message
    } finally {
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

  const edit_tags = () => view_tag_editor = true

  const save_tags = (e) => {
    view_tag_editor = false;
    edited.tags = e.detail.tags
  }

</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
  {#if view_tag_editor}
    <Tags_Modal all_tags={$user_tags} compound_tags={edited.tags} on:close={save_tags} />
  {:else}
    <div id="Edit">
      <h3>Editing {name}</h3>
      <table>
        {#each Object.entries(edited) as [key, value]}
          {#if key !== 'tags'}
            <tr>
              <th>{readable(key)}</th>
              <td><input type="text" bind:value={edited[key]}></td>
            </tr>
          {:else}
            <tr class="Tags" on:click={edit_tags}>
              <th>Tags</th>
              {#if !edited.tags[0] || !edited.tags}
                <td class="Expand">(Click to expand)</td>
              {:else}
                <td class="Tags" title="Click to edit">
                  {#each edited.tags as tag}
                    <button class="Tag" on:click={tgl_tag(tag.name)}>{tag}</button>
                  {/each}
                </td>
              {/if}
            </tr>
          {/if}
        {/each}
      </table>
      <div class="Actions">
        <button on:click={remove}>Delete</button>
        <button on:click={update}>Update</button>
      </div>
    </div>
  {/if}
{/if}