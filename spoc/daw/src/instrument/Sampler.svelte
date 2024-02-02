<script>
  import { createEventDispatcher } from 'svelte';
  import TopBar from './component/TopBar.svelte'

  const BASE_URL = 'https://dchqsxvlazultvsphmau.supabase.co/storage/v1/object/public/samples';
  const dispatch = createEventDispatcher();
  let editing = false;

  const default_samples = {
    'Snare 01': '/snare/snare_01.wav',
    'Snare 02': '/snare/snare_02.wav',
    'Snare 03': '/snare/snare_03.wav',
    'Kick 01': '/kick/kick_01.wav',
    'Kick 02': '/kick/kick_02.wav',
    'Kick 03': '/kick/kick_03.wav',
    'HiHat 01': '/hihat/hihat_01.wav',
    'HiHat 02': '/hihat/hihat_02.wav',
    'HiHat 03': '/hihat/hihat_03.wav',
  };

  const meta = {
    'info': { 'name':'Sampler', 'version':'v0.8' },
    'grid': default_samples
  };

  const play = (sample) => dispatch('play', BASE_URL + sample)

  const tgl_editing = () => editing = !editing;

  const change = (sample) => console.log('edit', sample);

  const midi_input = (e) => {
    switch (e.key) {
      case 'q': play(Object.values(default_samples)[0]); break;
      case 'w': play(Object.values(default_samples)[1]); break;
      case 'e': play(Object.values(default_samples)[2]); break;
      case 'a': play(Object.values(default_samples)[3]); break;
      case 's': play(Object.values(default_samples)[4]); break;
      case 'd': play(Object.values(default_samples)[5]); break;
      case 'z': play(Object.values(default_samples)[6]); break;
      case 'x': play(Object.values(default_samples)[7]); break;
      case 'c': play(Object.values(default_samples)[8]); break;
      default: break;
    }
  };

</script>

<svelte:window on:keydown|preventDefault={midi_input} />

<div class="Window" id="Sampler">
  <TopBar info={meta.info} />

  <div class="Config">
    <button class:Editing={editing} on:click={() => tgl_editing()}>
      {#if editing}Editing in v1.0{:else}Edit samples{/if}
    </button>
  </div>

  <div class="Samples">
    {#each Object.entries(meta.grid) as [key, value]}
      {#if editing}
        <div class="Sample Editable" on:click={() => change(key)}>{key}</div>
      {:else}
        <div class="Sample" on:click={() => play(value)}>{key}</div>
      {/if}
    {/each}
  </div>

</div>
