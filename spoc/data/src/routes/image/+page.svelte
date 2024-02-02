<script lang="ts">
  import { PUBLIC_IMAGE_HOST } from '$env/static/public'
  import type { PageData } from "./$types";

  export let data: PageData;
  let images = data.images;

  const make_url = img => `${PUBLIC_IMAGE_HOST}${img.filename}.${img.ext}`
  const make_url_thumbnail = img => `${PUBLIC_IMAGE_HOST}${img.filename}_thumbnail.webp`
  const open_url = url => window.open(make_url(url), '_blank')

</script>

<main class="ImageGallery" >
  {#each images as img}
    {#if img.show}
      <a href={`./image/${img.filename}`} >
        <figure title={`${img.x}×${img.y}`}>
          <figcaption>{img.name}</figcaption>
          <img src={ make_url_thumbnail(img) } alt={img.name} />
        </figure>
      </a>
    {/if}
  {/each}
  <a href="../" class="Exit" >Exit</a>
</main>