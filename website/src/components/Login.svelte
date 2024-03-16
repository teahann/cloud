<script>
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js'
  
  const user_input = { email: '', password: '' };
  let loading = false;
  let error = null;

  const register = async() => {
    try {
      const { error } = await supabase.auth.signUp(user_input);
      if (error) throw error;
      alert('Registration successful!');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  };

  const login = async() => {
    try {
      loading = true;
      const { error } = await supabase.auth.signInWithPassword(user_input);
      if (error) throw error;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  };

  const signout = async() => {
    try {
      loading = true;
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
  <div id="Account">
    {#if $user.id}
      <h3>You are signed in as {$user.email}</h3>
      <div class="Actions">
        <button on:click={signout}>Sign out</button>
      </div>
    {:else}
      {#if error}
        <p class="Error">{error}</p>
      {/if}
      <div class="Fields">
        <input type="text" bind:value={user_input.email} placeholder="Email" />
        <input type="password" bind:value={user_input.password} placeholder="Password" />
      </div>
      <div class="Actions">
        <button on:click={register} disabled={loading}>Register</button>
        <button on:click={login} disabled={loading}>Login</button>
      </div>
    {/if}
  </div>
{/if}


