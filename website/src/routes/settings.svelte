<script>
  import { background, init_background, reset_background } from '@/utils/background.js'

  $: background, init_background()

</script>

<div id="List" class="Settings">
  <div class="Option">
    <h3 on:click={reset_background} title="Click to reset">
      Background Gradient
    </h3>
    <div class="Field">
      <label><input type="number" bind:value={background.degrees}> degrees</label>
      <input type="range" min="0" max="360" bind:value={background.degrees}>
    </div>
    <div class="Field">
      <label for="color1">Color 1</label>
      <input type="color" id="color1" bind:value={background.color1} />
    </div>
    <div class="Field">
      <label for="color2">Color 2</label>
      <input type="color" id="color2" bind:value={background.color2} />
    </div>
  </div>
</div>

