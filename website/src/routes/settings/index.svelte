<script>
  import { onMount } from 'svelte';
  import { load_bg } from '@/utils/bg.js';
  import bgs from './bgs.json';

  let BG_URL = window.localStorage.getItem('BG_URL') || '';
  $: if (BG_URL) { load_bg(BG_URL) }

  const rand_bg = () => BG_URL = bgs[Math.floor(Math.random() * bgs.length)]

  const clear_bg = () => {
    window.localStorage.clear()
    location.reload()
  }
</script>


<div id="Settings">
  
  <div class="Setting">
    <label for="bg">Background</label>
    <button on:click={clear_bg} title="Reset">🔄️</button>
    <button on:click={rand_bg} title="Random">🔀</button>
    <input type="text" id="bg" bind:value={BG_URL} placeholder="URL here" />
  </div>

</div>
