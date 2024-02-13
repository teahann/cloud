<script>
  import { createEventDispatcher } from 'svelte';

  const BASE_URL = 'https://dchqsxvlazultvsphmau.supabase.co/storage/v1/object/public/samples';
  const dispatch = createEventDispatcher();

  const grid = {
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

  const play = (sample) => dispatch('play', BASE_URL + sample)

  const midi_input = (e) => {
    switch (e.key) {
      case 'q': play(Object.values(grid)[0]); break;
      case 'w': play(Object.values(grid)[1]); break;
      case 'e': play(Object.values(grid)[2]); break;
      case 'a': play(Object.values(grid)[3]); break;
      case 's': play(Object.values(grid)[4]); break;
      case 'd': play(Object.values(grid)[5]); break;
      case 'z': play(Object.values(grid)[6]); break;
      case 'x': play(Object.values(grid)[7]); break;
      case 'c': play(Object.values(grid)[8]); break;
      default: break;
    }
  };

</script>

<svelte:window on:keydown|preventDefault={midi_input} />

<div id="Sampler">
  {#each Object.entries(grid) as [key, value]}
    <button on:click={() => play(value)}>{key}</button>
  {/each}
</div>
