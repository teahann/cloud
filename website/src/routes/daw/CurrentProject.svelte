<script>
  import { volume, view } from './state.js';

  const tgl_view = (name) => $view === name ? view.set('') : view.set(name)
</script>

<header>
  <input type="range" id="vol" min="0" max="1" step="0.05" bind:value={$volume}/>
  <button class:Open={$view === 'sampler'} on:click={() => tgl_view('sampler')}>Sampler</button>
  <button class:Open={$view === 'synth'} on:click={() => tgl_view('synth')}>Synth</button>
</header>
