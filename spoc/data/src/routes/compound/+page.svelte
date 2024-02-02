<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let compounds = data.compounds;

</script>

<main>
  {#each compounds as compound}
    <a href={`./compound/${compound.name}`} class="Row List" >{compound.name}</a>
  {/each}
  <a href="../" class="Row Exit" >Exit</a>
</main>
