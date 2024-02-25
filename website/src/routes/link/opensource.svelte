<script>
  const data = {
    "Anbox": "https://github.com/anbox/anbox",
    "Ansible VPN": "https://github.com/trailofbits/algo",
    "Arachni": "https://github.com/Arachni/arachni",
    "BareMetal": "https://github.com/ReturnInfinity/BareMetal",
    "Blink": "https://github.com/jart/blink",
    "Binary Alert": "https://github.com/airbnb/binaryalert",
    "Cyber Chef 🧑‍🍳": "https://github.com/gchq/CyberChef",
    "Google": "https://github.com/google-research/google-research",
    "Go VPN": "https://github.com/bigeagle/gohop",
    "HappyX": "https://github.com/HapticX/happyx",
    "HUNT": "https://github.com/bugcrowd/HUNT",
    "Ike Scan 🚒": "https://github.com/royhills/ike-scan",
    "Libuv": "https://github.com/libuv/libuv",
    "⚗️OpenBabel": "https://github.com/openbabel/openbabel",
    "Quake Arena": "https://github.com/id-Software/Quake-III-Arena",
    "Swap Digger": "https://github.com/sevagas/swap_digger",
    "Tinygrad": "https://github.com/tinygrad/tinygrad",
    "tpotce": "https://github.com/telekom-security/tpotce",
    "Turbo Intruder💨": "https://github.com/PortSwigger/turbo-intruder",
    "Voice Changer": "https://github.com/w-okada/voice-changer",
    "Web log analyzer": "https://github.com/allinurl/goaccess",
  }
</script>

<div id="Links" class="List">
  <a href="./" class="Back">❌</a>
  {#each Object.entries(data) as [name, url]}
    <a href={url} target="_blank">{name}</a>
  {/each}
</div>
