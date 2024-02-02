<script>
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import TopBar from './component/TopBar.svelte';
  import Selector from './component/Selector.svelte';

  const dispatch = createEventDispatcher();
  const get_freq = (oct, i) => $synth.pitch*2**(oct-4+(i-9)/12);

  const meta = {
    'info': { 'name':'Basic Synth', 'version':'v1.1' },
    'notes': ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
    'octaves': { 'min':2, 'max':5 },
    'pitch_range': [...new Array(21)].map((_, i)=>i+430),
    'waveforms': ['sine','square','triangle','sawtooth']
  };

  const synth = writable({
    pitch: 440,
    keys: new Array(),
    generators: {
      osc_a: { type:'sine', level: 1.0 },
      osc_b: { type: 'sawtooth', level: 0.5 },
    },
    // filter: { type: 'lowpass', cutoff: 0.4, res: 0.3, pan: 0.5, drive: 0.4, fat: 0.0, mix: 1.0 }
  });

  const play = (freq) => dispatch('play', { generators: $synth.generators, freq });

  $: if ($synth.pitch) {
    let keys = new Array();
    for (let octave = meta.octaves.min; octave <= meta.octaves.max; octave++)
      keys.unshift(meta.notes.map((_, i) => get_freq(octave, i)));
    synth.update(s => ({ ...s, keys }));
  };

  $: range = {
    min: [...Array(meta.octaves.max).keys()],
    max: [...Array(9 - meta.octaves.min).keys()].map(i => i + meta.octaves.min + 1)
  };

  const key_map = [
    ['1','2','3','4','5','6','7','8','9','0','-','='],
    ['q','w','e','r','t','y','u','i','o','p','[',']'],
    ['a','s','d','f','g','h','j','k','l',';','\'','Enter'],
    ['z','x','c','v','b','n','m',',','.','/','Shift']
  ]

  const midi_input = (e) => {
    for (let row = 0; row < key_map.length; row++) {
      const col = key_map[row].indexOf(e.key);
      if (col !== -1) {
        play($synth.keys[row][col])
        highlight_cell(row, col)
      }
    }
  };

  const highlight_cell = (row, col) => {
    const cell = document.querySelector(`table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
    cell.classList.add("Playing");
    setTimeout(() => cell.classList.remove("Playing"), 300);
}

</script>

<svelte:window on:keydown|preventDefault={midi_input} />

<div class="Window" id="Synth">
  <TopBar info={meta.info} />
  
  <div class="Config">
    <div class="Row">
      <Selector label={'Hz'} opt_label={true} options={meta.pitch_range} bind:selection={$synth.pitch}/>
      <div class="Group">
        <Selector label={'Octaves'} opt_label={false} options={range.min} bind:selection={meta.octaves.min}/>
        <Selector label={'to'} opt_label={false} options={range.max} bind:selection={meta.octaves.max}/>
      </div>
    </div>

    <div class="Row">
      <div class="Setting Oscillator">
        <label for="osc_a">OSC A</label>
        <select bind:value={$synth.generators.osc_a.type} id="osc_a">
          {#each meta.waveforms as type}<option value={type}>{type}</option>{/each}
        </select>
        <input type="range" id="osc_b" min="0" max="1" step="0.05" bind:value={$synth.generators.osc_a.level}/>
      </div>
      <div class="Setting Oscillator">
        <label for="osc_b">OSC B</label>
        <select bind:value={$synth.generators.osc_b.type} id="osc_b">
          {#each meta.waveforms as type}<option value={type}>{type}</option>{/each}
        </select>
        <input type="range" id="osc_b" min="0" max="1" step="0.05" bind:value={$synth.generators.osc_b.level}/>
      </div>
    </div>
  </div>

  <table class="Keys">
    {#each $synth.keys as octave}
      <tr>
        {#each octave as note}
          <td on:click={() => play(note)}>{note.toFixed()}</td>
        {/each}
      </tr>
    {/each}
    <tr>
      {#each meta.notes as note}
        <th>{note}</th>
      {/each}
    </tr>
  </table>

</div>
