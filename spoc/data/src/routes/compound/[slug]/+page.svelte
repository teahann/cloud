<script lang="ts">
  import type { PageData } from "./$types";
  import Model_Viewer from './Model_Viewer.svelte'

  export let data: PageData;
  let compound = data.compound;

  const PUBCHEM_URL = `https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pid}`

</script>

<div class="Compound" >
  <a href={PUBCHEM_URL} target="_blank" class="Row Title" >{compound.name}</a>
  <Model_Viewer pid={compound.pid} />
  <a href="./" class="Row Exit">Back</a>
</div>
