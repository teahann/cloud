<script>
  const posts = [
    ['about', 'About'],
    ['links', 'Links'],
    ['oss', 'Opensource'],
    ['webtools', 'Web tools'],
    ['youtubes', 'YouTubes'],
    ['diets', 'Diets'],
    ['nutrient_classifications', 'Nutrient Classifications'],
  ]
</script>

<div class="Browser">
  <div class="Container">
    {#each posts as [route, title]}
      <a href={`/post/${route}`}>{title}</a>
    {/each}
  </div>
</div>
