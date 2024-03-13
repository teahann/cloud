<script>
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js'

  let loading = false;
  let error_message = null;

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
    let query = { name: compound.name, user_id: $user.id };
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
        const { data, error } = await supabase.from('compound').insert(make_query())
        if (error) { throw error } else { window.location.assign('./index') }
      } catch (err) {
        error_message = err.message;
      } finally {
        loading = false;
      }
    }
  };

  const tgl_tags_editor = () => console.log('Open/close tags editor')
</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
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
      <tr on:click={tgl_tags_editor}>
        <th>Tags</th>
        <td class="Expand">(Coming soon)</td>
      </tr>
      {#each Object.entries(urls) as [source, url]}
        <tr title={`Compound ID for ${source}`}>
          <th><a href={url} target="_blank" rel="noopener noreferrer">{source}</a></th>
          <td><input type="text" bind:value={compound.sources[source]}></td>
        </tr>
      {/each}
    </table>
    <div class="Actions">
      <button on:click={create}>Submit</button>
    </div>
  </div>
{/if}
