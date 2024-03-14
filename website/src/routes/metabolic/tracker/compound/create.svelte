<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Tags_Modal from '@/components/Tags_Modal.svelte';
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js'

  const user_tags = writable([])
  const filtered_tags = writable([])
  let loading = false;
  let error_message = null;
  let view_tag_editor = false;
  let tag_editor_search = '';

  onMount( async() => get_user_tags())

  const get_user_tags = async() => {
    try {
      loading = true;
      const { data, error } = await supabase.from('tag')
        .select('name').eq('user_id', $user.id)
      if (error) {
        throw error;
      } else {
        user_tags.set(data);
        filtered_tags.set(data)
      }
    } catch(err) {
      error_message = err.message
    } finally {
      loading = false;
    }
  }

  const urls = {
    'Chembl': 'https://ebi.ac.uk/chembl/g/#search_results/all',
    'Chemicalbook': 'https://chemicalbook.com/',
    'Chemspider': 'https://chemspider.com/Search.aspx',
    'Chebi': 'https://ebi.ac.uk/chebi',
    'Drugbank': 'https://go.drugbank.com/',
    'NIST': 'https://nist.gov/search',
    'Pubchem': 'https://pubchem.ncbi.nlm.nih.gov/',
    'Wikipedia': 'https://wikipedia.org/',
    'ZINC': 'https://zinc.docking.org/substances/'
  }

  const compound = {
    name: '',
    tags: [],
    sources: {
      'Chembl': '',
      'Chemicalbook': '',
      'Chemspider': '',
      'Chebi': '',
      'Drugbank': '',
      'NIST': '',
      'Pubchem': '',
      'Wikipedia': '',
      'ZINC': ''
    }
  };

  const make_query = () => {
    let query = {
      name: compound.name,
      user_id: $user.id,
      tags: compound.tags
    };
    for (const [k, v] of Object.entries(compound.sources)) {
      if (v !== '') query[`${k.toLowerCase().split(/(?=[A-Z])/).join('_')}_id`] = v
    }
    return query;
  }

  const entry_valid = () => {
    let is_valid = false;
    if (compound.name.length < 2) {
      error_message = 'Compound name is required';
    } else if (!Object.values(compound.sources).some(s => s.length)) {
      error_message = 'At least one source is required';
    } else {
      is_valid = true;
    }
    return is_valid;
  };

  const create = async () => {
    if (entry_valid()) {
      try {
        loading = true;
        const { data, error } = await supabase.from('compound').insert(make_query());
        if (error) { throw error } else { window.location.assign('./index') }
      } catch (err) {
        error_message = err.message;
      } finally {
        loading = false;
      }
    }
  };

  const edit_tags = () => view_tag_editor = true

  const save_tags = (e) => {
    view_tag_editor = false;
    compound.tags = e.detail.tags
  }

</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
  {#if view_tag_editor}
    <Tags_Modal all_tags={$user_tags} compound_tags={compound.tags} on:close={save_tags} />
  {/if}
  <div id="Edit">
    {#if error_message}
      <p class="Error">{error_message}</p>
    {/if}
    <h3>New compound</h3>
    <table>
      <tr>
        <th><label for="name">Name</label></th>
        <td><input type="text" id="name" bind:value={compound.name}></td>
      </tr>
      {#each Object.entries(urls) as [source, url]}
        <tr title={`Compound ID for ${source}`}>
          <th><a href={url} target="_blank" rel="noopener noreferrer">{source}</a></th>
          <td><input type="text" bind:value={compound.sources[source]}></td>
        </tr>
      {/each}
      <tr class="Tags" on:click={edit_tags}>
        <th>Tags</th>
        {#if compound.tags.length < 1}
          <td class="Expand">(Click to expand)</td>
        {:else}
          <td class="Tags" title="Click to edit">
            {#each compound.tags as tag}
              <p class="Tag">{tag}</p>
            {/each}
          </td>
        {/if}
      </tr>
    </table>
    <div class="Actions">
      <button on:click={create}>Submit</button>
    </div>
  </div>
{/if}
