<script>
  let selected = ''
</script>

<div id="Shop">
  {#if !selected}
    <button on:click={() => selected = 'nothing'} >Free</button>
    <button on:click={() => selected = 'premium'} >Premium</button>
    <button on:click={() => selected = 'limited'} >Limited</button>
  {:else}
    <h2>Under construction 🚧</h2>
  {/if}
</div>
