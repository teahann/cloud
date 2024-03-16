<script>
  import { createEventDispatcher } from 'svelte'

  export let modal_title, all_tags, compound_tags;

  const dispatch = createEventDispatcher()
  let filtered = all_tags
  let search = ''

  const close_modal = () => dispatch('close', { tags: compound_tags })

  const tgl_tag = (tag) => {
    if (!compound_tags.includes(tag)) {
      compound_tags = [...compound_tags, tag]
    } else {
      compound_tags = compound_tags.filter(t => t !== tag);
    }
  }

  const filter = () => {
    filtered = all_tags.filter(tag => {
      return tag.name.toLowerCase().includes(search.toLowerCase())
    })
  }

  $: contains_tag = (tag) => compound_tags.includes(tag);

</script>

<div id="Modal" class="Editor">
  <div class="Form">
    <h3>{modal_title}</h3>
    <div class="Search">
      <label for="tag_search">Search</label>
      <input id="tag_search" on:keyup={filter} bind:value={search}
      />
    </div>
    <table>
      {#each filtered as tag}
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