<script>
  import data from './data.json'
</script>

<div class="Generic Categorized">
  <header>
    <h2 class="Title">Links</h2>
    <h4 class="Date"><a href="./links/pdfs">01/21/2024</a></h4>
  </header>
  <div class="Content">
    {#each Object.entries(data) as [category, links]}
      <div class="Category">
        <h3 class="Title">{category}</h3>
        {#each Object.entries(links) as [name, url]}
          <a href={url} target="_blank">{name}</a>
        {/each}
      </div>
    {/each}
  </div>
  <a href="../" class="Back">Back</a>
</div>
