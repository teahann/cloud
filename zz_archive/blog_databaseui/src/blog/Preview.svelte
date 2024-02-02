<script lang=ts>
  import { createEventDispatcher } from 'svelte';
  import { format_date } from '../util/format_date.ts'
  export let blog;

  const dispatch = createEventDispatcher();
</script>

<div class="Preview" on:click={() =>  dispatch('open', blog.id)}>
  <h3 class="Date">{format_date(blog.date)}</h3>
  <h1 class="Title">{blog.title}</h1>
</div>