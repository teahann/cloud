<script>
  import { onMount } from 'svelte'
  import { isActive } from '@roxi/routify'
  import { load_bg } from '@/utils/bg.js'
  
  onMount(() => {
    document.readyState === 'complete' ? load_bg() : window.addEventListener('load', load_bg);
  })

  const links = [
    ['index', '🏡'],
    ['playlist', '🎧'],
    ['link', '🔗'],
    ['shop', '🛒'],
    ['daw', '🎼'],
    ['settings', '💾']
  ]
</script>


<nav>
  {#each links as [url, name]}
    <a href={`/${url}`} class:Open={$isActive(url)}>{name}</a>
  {/each}
</nav>

<main>
  <slot />
</main>
