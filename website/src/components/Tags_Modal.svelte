<script>
  import { createEventDispatcher } from 'svelte'

  export let all_tags, compound_tags;

  let filtered_tags = all_tags
  let search_query = ''

  const dispatch = createEventDispatcher()

  const close_modal = () => dispatch('close', { tags: compound_tags })

  const tgl_tag = (tag) => {
    if (!compound_tags.includes(tag)) {
      compound_tags = [...compound_tags, tag]
    } else {
      compound_tags = compound_tags.filter(t => t !== tag);
    }
  }

  const filter_tags = () => {
    filtered_tags = all_tags.filter(tag => {
      return tag.name.toLowerCase().includes(search_query.toLowerCase())
    })
  }

  $: contains_tag = (tag) => compound_tags.includes(tag);

</script>

<div id="Modal" class="Editor">
  <div class="Form">
    <h3>Editing compound tags</h3>
    <div class="Search">
      <label for="tag_search">Search</label>
      <input id="tag_search"
        on:keyup={filter_tags}
        bind:value={search_query}
      />
    </div>
    <table>
      {#each filtered_tags as tag}
        <tr on:click={() => tgl_tag(tag.name)}>
          <th>{contains_tag(tag.name) ? '✔' : '✖️'}</th>
          <td>{tag.name}</td>
        </tr>
      {/each}
    </table>
    <div class="Actions">
      <button on:click={close_modal}>Close</button>
    </div>
  </div>
</div>