<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { afterUrlChange } from '@roxi/routify';
  import Login from '@/components/Login.svelte';
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';

  let path = writable([]);

  onMount(() => {
    supabase.auth.onAuthStateChange((_, sesh) => user.set(sesh?.user || []));
    update_path(window.location.pathname);
  });

  $afterUrlChange(({ route }) => update_path(route.url));

  // Create nav based on url path name
  const update_path = (url) => {
    path.set(url
      .replace(/%20/g, ' ')
      .split('/')
      .filter(Boolean)
      .map((page, i, arr) => ({
        name: page,
        url: `/${arr.slice(0, i + 1).join('/')}`
      })
    ))
  }
</script>

<nav>
  <div class="Path">
    <a href="/" title="Home">🏡</a>
    {#each $path as { name, url }}
      <a href={url}><code>/</code>{name}</a>
    {/each}
  </div>
</nav>

{#if $user.id}
  <slot />
{:else}
  <Login />
{/if}