<script>
  import data from './data.json'
</script>

<div class="Generic List">
  <header>
    <h2 class="Title">Open Source Software</h2>
    <h4 class="Date">
      <a href="./links/pdfs">01/24/2024</a>
    </h4>
  </header>
  <div class="Content">
    {#each Object.entries(data) as [name, url]}
      <a href={url} target="_blank">{name}</a>
    {/each}
  </div>
  <a href="../" class="Back">Back</a>
</div>
