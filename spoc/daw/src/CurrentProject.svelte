<script>
  import { current_project, volume, view } from './state.js';

  const tgl_view = (name) => $view === name ? view.set('') : view.set(name)
  // View mutliple: view.update(v => v.includes(name) ? v.filter(n => n !== name) : [...v, name]);
</script>

<header>

  <section class="Project">
    <h2>{$current_project}</h2>
  </section>

  <section class="Volume">
    <label for="vol"><button on:click={() => volume.set(0)}>🔇</button></label>
    <input type="range" id="vol" min="0" max="1" step="0.05" bind:value={$volume}/>
    <label for="vol">🔊{($volume * 100).toFixed()}%</label>
  </section>

  <section class="Windows">
    <button class:Open={$view === 'sampler'} on:click={() => tgl_view('sampler')}>
      Sampler
    </button>
    <button class:Open={$view === 'synth'} on:click={() => tgl_view('synth')}>
      Synth
    </button>
  </section>
</header>
