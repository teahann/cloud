<script lang="ts">
  import { PUBLIC_IMAGE_HOST } from '$env/static/public'
  import type { PageData } from "./$types";

  export let data: PageData;
  let image = data.image;

  const IMAGE_URL = `${PUBLIC_IMAGE_HOST}${image.filename}.${image.ext}` 
  const send_bg = () => window.parent.postMessage(IMAGE_URL, 'https://spoc.zip')

</script>

<div class="Image" >
  <h3>{`${image.name}.${image.ext} (${image.x} × ${image.y})`}</h3>
  <img src={IMAGE_URL} alt={image.name} />
  <div class="Row">
    <a href="./" >Back</a>
    <button on:click={() => send_bg(image)} >Set BG</button>
    <a href={IMAGE_URL} target="_blank" >Full size</a>
  </div>
</div>