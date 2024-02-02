<script>
  import data from './data.json'
  const create_link = (channel) => `https://youtube.com/@${channel}/videos`
</script>

<div class="Generic Categorized">
  <header>
    <h2 class="Title">YouTube Channels</h2>
    <h4 class="Date">01/20/2024</h4>
  </header>
  <div class="Content">
    {#each Object.entries(data) as [category, channels]}
      <div class="Category">
        <h3 class="Title">{category}</h3>
        {#each channels as channel}
          <a href={create_link(channel)} target="_blank">{channel}</a>
        {/each}
      </div>
    {/each}
  </div>
  <a href="../" class="Back">Back</a>
</div>
