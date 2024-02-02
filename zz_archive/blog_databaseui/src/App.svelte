<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { format_date } from './util/format_date.ts'
  import Database from './util/database.ts';
  import Preview from './blog/Preview.svelte';
  import Read from './blog/Read.svelte';

  const all_blogs: Writable<Blog[]> = writable([]);
  const blog: Writable<Blog | null> = writable(null);

  let Db = new Database();

  onMount(async() => all_blogs.set(await Db.get_all()));

  const tgl = async (event) => {
    event ? blog.set(await Db.get_id(event.detail)) : blog.set(null);
  }

</script>

{#if $all_blogs.length}
  <main class={!$blog ? "All" : "Read"}>
    {#if !$blog}
      {#each $all_blogs as b}
        <Preview blog={b} on:open={tgl} />
      {/each}
    {:else}
      <Read blog={$blog} on:close={tgl} />
    {/if}
  </main>
{/if}