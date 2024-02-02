<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let celestials = data.celestials;

</script>

<main>
  {#each celestials as cel}
    <a href={`./celestial/${cel.url}`} class="Row" >{cel.name}</a>
  {/each}
  <a href="../" class="Row Exit" >Exit</a>
</main>
