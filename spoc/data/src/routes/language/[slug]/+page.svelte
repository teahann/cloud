<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let language = data.language;

</script>

<main>
  <h2 class="Row" title={language.category} >{language.name} ({language.year})</h2>
  <h2 class="Row" >{language.category}</h2>
  {#if language.note}
    <code class="Row Smol">{language.note}</code>
  {/if}
  <a href="./" class="Row" >Back</a>
</main>
