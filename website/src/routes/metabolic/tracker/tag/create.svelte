<script>
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js'

  let error_message = '';
  let loading = false;
  const tag = { user_id: $user.id, name: '', description: '' };

  const entry_valid = () => {
    let is_valid = false;
    if (tag.name.length < 2) { 
      error_message = 'Name required'
    } else {
      is_valid = true;
    }
    return is_valid;
  };

  const create = async () => {
    if (entry_valid()) {
      try {
        loading = true;
        const { data, error } = await supabase.from('tag').insert([tag]).select()
        if (error) { throw error } else { window.location.assign('./index') }
      } catch (err) {
        error_message = err.message;
      } finally {
        loading = false;
      }
    }
  };
</script>

<div id="Edit">
  {#if error_message}
    <p class="Error">{error_message}</p>
  {/if}
  <h3>New tag</h3>
  <table>
    <tr>
      <th>Name</th>
      <td><input type="text" bind:value={tag.name}></td>
    </tr>
    <tr>
      <th>Description</th>
      <td><input type="text" bind:value={tag.description}></td>
    </tr>
  </table>
  <div class="Actions">
    <button on:click={create}>Submit</button>
  </div>
</div>