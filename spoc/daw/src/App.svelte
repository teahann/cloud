<script>
  import { onMount, onDestroy } from 'svelte';
  import { volume, view } from './state.js'
  import CurrentProject from './CurrentProject.svelte';
  import Sampler from './instrument/Sampler.svelte';
  import Synth from './instrument/Synth.svelte';

  let context, gain_node;
  let osc_pool = new Array();
  let active_oscs = new Map();
  let sample_cache = new Map();

  $: if (gain_node) gain_node.gain.value = $volume;

  onMount(() => {
    context = new AudioContext();
    gain_node = context.createGain();
    gain_node.connect(context.destination);
  })

  onDestroy(() => {
    active_oscs.forEach(osc => {
      clearTimeout(osc.timer);
      osc.oscillator.stop();
      osc.oscillator.disconnect();
    });
    context.close().catch(err => console.error(err))
  })

  // -------- Sampler --------
  const play_sample = (e) => load_sample(e.detail).then(play_audio).catch(err => console.error(err))

  const load_sample = async (url) => {
    let file = sample_cache.get(url);
    if (!file) {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      file = await context.decodeAudioData(buffer);
      sample_cache.set(url, file);
    }
    return file;
  };

  const play_audio = (buffer) => {
    const sample = context.createBufferSource();
    sample.buffer = buffer;
    sample.connect(gain_node);
    sample.start();
  };
  
  // -------- Synth --------
  const play_freq = async (e) => {
    if (context.state === 'suspended') await context.resume();
    let { generators, freq } = e.detail;
    Object.entries(generators).forEach(([genId, generator]) => {
      if (generator.level > 0) {
        let osc = osc_pool.pop() || context.createOscillator()
        osc.type = generator.type;
        osc.frequency.value = freq;
        let oscGain = context.createGain();
        oscGain.gain.value = generator.level;
        osc.connect(oscGain).connect(gain_node);
        osc.start();
        let timer = setTimeout(() => {
          osc.stop();
          osc.disconnect();
          oscGain.disconnect();
          active_oscs.delete(timer);
        }, 300);
        active_oscs.set(timer, { oscillator: osc, timer });
      }
    });
  }

</script>

<main class="Host">
  <CurrentProject />
  {#if $view.length}
    <div class="Instrument">
      {#if $view === 'sampler'}
        <Sampler on:play={play_sample} />
      {:else if $view = 'synth'}
        <Synth on:play={play_freq} />
      {/if}
    </div>
  {/if}
</main>