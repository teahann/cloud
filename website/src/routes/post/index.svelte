<script>
    const posts = [
      ['Metabolic', 'metabolic'],
      ['Tech', 'tech']
    ]
</script>


<div id="Post" class="Browser">
  {#each posts as [name, url]}
    <a href={`./post/${url}`}>{name}</a>
  {/each}
</div>
