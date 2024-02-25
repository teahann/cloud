<script>
  const posts = {
    'Band': 'band',
    'Drone': 'drone'
  }
</script>

<div id="Post" class="Browser">
  <h2>Tech posts</h2>
  {#each Object.entries(posts) as [name, url]}
    <a href={`./tech/${url}`}>{name}</a>
  {/each}
  <a href="./index" class="Back">Back</a>
</div>
