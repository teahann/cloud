<script>
  import { onMount } from 'svelte';
  import { DEFAULT_BG, BUCKET_URL, load_bg } from '@/utils/bg.js';
  
  const bgs = ['Default', 'Mountain', 'Lofi_Lake', 'Retro_Leaves', 'Tiled']
  // load_bg if BG_URL on load and on change
  let BG_URL = window.localStorage.getItem('BG_URL') || DEFAULT_BG;
  $: if (BG_URL) { load_bg(BG_URL) }

  const rand_bg = () => {
    let rand_file = bgs[Math.floor(Math.random() * bgs.length)];
    BG_URL = `${BUCKET_URL}${rand_file}.webp`
  }
</script>


<div id="Settings">
  <label for="bg">
    Background Image
    <button on:click={() => BG_URL = DEFAULT_BG}>🔄️</button>
    <button on:click={rand_bg}>🔀</button>
  </label>
  <input type="text" id="bg" bind:value={BG_URL} />
</div>
