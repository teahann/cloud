<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let languages = data.languages;

</script>

<main>
  {#each languages as lang}
    <a href={`/language/${lang.url}`} class="Row" title={lang.year} >{lang.name}</a>
  {/each}
  <a href="../" class="Row Exit">Exit</a>
</main>
