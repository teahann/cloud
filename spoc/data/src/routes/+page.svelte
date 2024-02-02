<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let commands = data.commands;
</script>

<main>
  {#each commands as command}
    {#if command.show}
      <a href={command.url} class="Row">{command.name}</a>
    {/if}
  {/each}
</main>
