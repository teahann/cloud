<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { afterUrlChange } from '@roxi/routify';
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';

  let path = writable([]);

  onMount(() => {
    supabase.auth.onAuthStateChange((_, sesh) => user.set(sesh?.user || []));
    update_path(window.location.pathname);
  });

  $afterUrlChange(({ route }) => update_path(route.url));

  const update_path = (url) => {
    const path_array = url.replace(/%20/g, ' ').split('/').filter(Boolean).map((page, i, arr) => ({
      name: page,
      url: `/${arr.slice(0, i + 1).join('/')}`
    }));
    path.set(path_array)
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