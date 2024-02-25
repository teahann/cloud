<script>
  const posts = {}
</script>

<div id="Post" class="Browser">
  <h2>Metabolic posts</h2>
  {#each Object.entries(posts) as [name, url]}
    <a href={url}>{name}</a>
  {/each}
  <a href="./index" class="Back">Back</a>
</div>
