<script lang=ts>
  import { createEventDispatcher } from 'svelte';
  import { format_date } from '../util/format_date.ts'
  export let blog;

  const dispatch = createEventDispatcher();
</script>

<header>
  <h1 class="Title">{blog.title}</h1>
  <h3 class="Date">{format_date(blog.date)}</h3>
</header>
<div class="Content">{@html blog.content}</div>
<button class="Close" on:click={() =>  dispatch('close')}>Close</button>