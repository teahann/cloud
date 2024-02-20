<script>
    const posts = [
      ['Metabolic', 'metabolic'],
      ['Tech', 'tech']
    ]
</script>


<div id="Posts">
  {#each posts as [name, url]}
    <a href={`./post/${url}`}>{name}</a>
  {/each}
</div>
