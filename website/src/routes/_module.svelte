<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { afterUrlChange } from '@roxi/routify';
  // components
  import Account_Modal from '@/components/Account_Modal.svelte';
  import Background from '@/components/Background.svelte';
  // utils
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';
  import { loading } from '@/utils/loading.js';
  import { init_background } from '@/utils/background.js';

  let path = writable([]);
  let show_account = false;

  onMount(() => {
    init_background()
    supabase.auth.onAuthStateChange((_, sesh) => user.set(sesh?.user || []));
    load_header(window.location.pathname);
  });

  $afterUrlChange(({ route }) => load_header(route.url));

  // Load nav items from URL path
  const load_header = (url) => {
    path.set(url.replace(/%20/g, ' ')
      .split('/').filter(Boolean).map((page, i, arr) => ({
        name: page,
        url: `/${arr.slice(0, i + 1).join('/')}`
      })
    ))
  }

  const tgl_account = () => show_account = !show_account;

</script>

{#if show_account}
  <Account_Modal on:close={tgl_account} />
{/if}

{#if $loading}
  <div id="Loading">
    <h5>Loading</h5>
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{/if}

<header>
  <nav>
    <div class="Left">
      <a href="/" class="Home">🏠</a>
      {#each $path as { name, url }}
        <a href={url}>{name}</a>
      {/each}
    </div>
    <div class="Right">
      <button on:click={tgl_account} class:Open={show_account} on:mouseenter={tgl_account}>
        {#if $user.id}{$user.email.split("@")[0]}{:else}Login{/if}
      </button>
    </div>
  </nav>
</header>

{#if $user.id}
  <slot />
{/if}

<Background />
