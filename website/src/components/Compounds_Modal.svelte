<!-- TODO:: Ability to search admin's compounds -->
<!-- supabase.from('compound').select().eq('source', 'admin') -->
<script>
  import { createEventDispatcher } from 'svelte'

  export let modal_title, all_compounds, report_compounds;

  const dispatch = createEventDispatcher()
  let filtered = all_compounds
  let search = ''

  $: contains_compound = (compound) => report_compounds.includes(compound)

  const add = (compound) => {
    if (!report_compounds.includes(compound)) {
      report_compounds = [...report_compounds, compound]
    } else {
      report_compounds = report_compounds.filter(c => c !== compound)
    }
  }

  const save = () => dispatch('close', { compounds: report_compounds })

</script>

<div id="Modal" class="Compounds">
  <div class="Form">
    <h3>{modal_title}</h3>
    <table>
      {#each Object.entries(all_compounds) as [key, value]}
      <tr on:click={add(value.name)}>
        <th>{contains_compound(value.name) ? '✔' : '✖️'}</th>
        <td>{value.name}</td>
      </tr>
      {/each}
    </table>
    <div class="Actions">
      <button on:click={save}>Close</button>
    </div>
  </div>
</div>