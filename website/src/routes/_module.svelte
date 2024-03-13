<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { afterUrlChange } from '@roxi/routify';
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';

  let path = writable([]);

  onMount(() => {
    supabase.auth.onAuthStateChange((_, sesh) => user.set(sesh?.user || []));
    updatePath(window.location.pathname);
  });

  $afterUrlChange(({ route }) => updatePath(route.url));

  function updatePath(url) {
    const pathArray = url.split('/').filter(Boolean).map((page, i, arr) => ({
      name: page,
      url: `/${arr.slice(0, i + 1).join('/')}`
    }));
    if (pathArray.length > 0 && pathArray[pathArray.length - 1].name === 'index') pathArray.pop()
    path.set(pathArray);
  }
</script>

<nav>
  <div class="Path">
    <a href="/" title="Home">🏡</a>
    {#each $path as { name, url }}
      <a href={url}><code>/</code>{name}</a>
    {/each}
  </div>
  <div class="Account">
    <a href="/account">🗝️</a>
  </div>
</nav>

<slot />