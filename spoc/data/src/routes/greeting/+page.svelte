<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let greetings = data.greetings.sort(() => Math.random() - 0.5);

</script>

<main>
  {#each greetings as greeting}
    <h2 class="Row Smol" title={greeting.language} >{greeting.greeting}</h2>
  {/each}
  <a href="../" class="Row Exit">Exit</a>
</main>
