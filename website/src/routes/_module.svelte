<script>
  import { onMount } from 'svelte'
  import { isActive } from '@roxi/routify'
  import { load_bg } from '@/utils/bg.js'
  
  // Load bg url from localStorage
  onMount(() => {
    document.readyState === 'complete' ? load_bg() : window.addEventListener('load', load_bg);
  })

  const links = [
    ['🏡', 'index', 'Home'],
    ['🎧', 'playlist', 'Curated YouTube Videos'],
    ['📝', 'post', 'Random words assembled together'],
    ['🔗', 'link', 'Other sites to check out'],
    ['🛒', 'shop', 'Buy stuff'],
    ['🎼', 'daw', 'Play a synth of drum kit'],
    ['💾', 'settings', 'Customize this site']
  ]
</script>

<main>
  <slot />
</main>

<nav>
  {#each links as [label, url, desc]}
    <a href={`/${url}`} class:Open={$isActive(url)} title={desc}>{label}</a>
  {/each}
</nav>
