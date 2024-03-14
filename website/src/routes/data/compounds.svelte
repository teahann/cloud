<!-- NOTE:: Add boolean for "FDA" default compounds -->
<!-- (instead of by user_id) -->
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store'
  import { supabase } from '@/utils/supabase.js'

  const PUBCHEM_URL = 'https://pubchem.ncbi.nlm.nih.gov/compound/'
  const compounds = writable([])
  const report_compounds = writable([])
  let loading = false;
  let error_message = null;

  onMount(() => get_admin_compounds())

  const get_admin_compounds = async() => {
    try {
      loading = true;
      const { data, error } = await supabase.from('compound').select().eq('source', 'admin')
      if (error) { throw error } else { compounds.set(data) }
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
  <h3>Compounds</h3>
  <table>
    <tr>
      <th>Name</th>
      <th>Pubchem ID</th>
    </tr>
    {#each $compounds as compound}
      <tr>
        <td>{compound.name}</td>
        <td class="Link">
          <a href={PUBCHEM_URL + compound.pubchem_id}
            target="_blank">
            {compound.pubchem_id}
          </a>
        </td>
      </tr>
    {/each}
  </table>
</div>
