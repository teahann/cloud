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

<div id="Data" class="Compounds">
  {#if error_message}
    <p class="Error">{error_message}</p>
  {/if}
  <h3>Compounds</h3>
  <table>
    <tr>
      <th class="Name">Name</th>
      <th class="Pubchem">Pubchem</th>
    </tr>
    {#each $compounds as compound}
      <tr>
        <td class="Name">{compound.name}</td>
        <td class="Pubchem Link">
          <a href={PUBCHEM_URL + compound.pubchem_id}
            target="_blank">
            {compound.pubchem_id}
          </a>
        </td>
      </tr>
    {/each}
  </table>
</div>
