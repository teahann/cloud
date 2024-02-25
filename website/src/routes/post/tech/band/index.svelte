<script>
  const frequencies = {
    "ELF": "3 Hz-30 Hz",
    "SLF": "30 Hz-300 Hz",
    "ULF": "300 Hz-3 kHz",
    "HF": "3-30 MHz",
    "VHF": "30-300 MHz",
    "UHF": "300-1000 MHz",
    "L": "1-2 GHz",
    "S": "2-4 GHz",
    "C": "4-8 GHz",
    "X": "8-12 GHz",
    "Ku": "12-18 GHz",
    "K": "18-27 GHz",
    "Ka": "27–40 GHz",
    "V": "40-75 GHz",
    "W": "75-110 GHz"
  }
</script>

<div id="Post" class="Bands">
  <h2>Electromagnetic Frequencies</h2>
  {#each Object.entries(frequencies) as [band, range]}
    <div class="Band">
      <h3>{band}</h3><p>{range}</p>
    </div>
  {/each}
  <a href="./index">Back</a>
</div>
