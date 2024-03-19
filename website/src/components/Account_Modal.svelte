<script>
  import { createEventDispatcher } from 'svelte'
  import { login, register, signout } from '@/utils/supabase.js';
  import { loading } from '@/utils/loading.js'
  import { user } from '@/utils/user.js'
  
  const user_input = { email: '', password: '' };
  const dispatch = createEventDispatcher()
  let message = '';

  const close_modal = () => dispatch('close')

</script>

<div id="Modal" class="Account" on:mouseleave={close_modal}>
  <div class="Container">
    {#if $user.id}
      <div class="Options">
        <a href="/settings">Settings</a>
        <button on:click={signout}>Sign out</button>
      </div>
    {:else}
      <div class="Login">
        <p class="Error">{message}</p>
        <input type="text" bind:value={user_input.email} placeholder="Email">
        <input type="password" bind:value={user_input.password} placeholder="Password">
        <button on:click={() => register(user_input)} disabled={$loading}>
          Register
        </button>
        <button on:click={() => login(user_input)} disabled={$loading}>
          Login
        </button>
      </div>
    {/if}
  </div>
</div>
