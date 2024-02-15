<script>
  import { onMount } from 'svelte';
  import { BUCKET_URL, load_bg } from '@/utils/bg.js';
  
  const bgs = ['Default', 'Mountain', 'Lofi_Lake', 'Retro_Leaves', 'Tiled']
  let BG_URL = window.localStorage.getItem('BG_URL') || '';
  $: if (BG_URL) { load_bg(BG_URL) }

  const rand_bg = () => {
    let rand_file = bgs[Math.floor(Math.random() * bgs.length)];
    BG_URL = `${BUCKET_URL}${rand_file}.webp`
  }

  const clear_bg = () => {
    window.localStorage.clear()
    location.reload()

  }
</script>


<div id="Settings">
  <label for="bg">
    Background Image
    <button on:click={clear_bg}>🔄️</button>
    <button on:click={rand_bg}>🔀</button>
  </label>
  <input type="text" id="bg" bind:value={BG_URL} />
</div>
