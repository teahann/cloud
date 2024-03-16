<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Compounds_Modal from '@/components/Compounds_Modal.svelte'
  import { supabase } from '@/utils/supabase.js';
  import { user } from '@/utils/user.js';
  import { datetime_to_sql, sql_to_datetime } from '@/utils/dates.js';

  export let report_number;

  onMount(() => {
    // TODO:: combine queries
    get_user_report();
    get_user_compounds();
  })
  
  let loading = true;
  let error_message = null;
  let compound_viewer = false;
  const user_compounds = writable([])
  const report = writable({});
  let edited = {};

  const make_query = () => {
    return {
      user_id: $user.id,
      start_time: datetime_to_sql(time.start),
      end_time: datetime_to_sql(time.end),
      title: report.title,
      article: report.article,
      report_number: report.number
    }
  }

  const get_user_compounds = async() => {
    try {
      loading = true;
      const { data, error } = await supabase.from('compound').select('name').eq('user_id', $user.id)
      if (error) {
        throw error
      } else {
        user_compounds.set(data)
        edited = data
      }
    } catch (err) {
      error_message = err.message;
    } finally {
      loading = false;
    }
  }

  const get_user_report = async() => {
    try {
      loading = true
      const { data, error } = await supabase.from('report')
        .select('title, article, start_time, end_time, compounds')
        .eq('report_number', report_number).eq('user_id', $user.id);
      if (error) {
        throw error;
      } else {
        if (data[0]) {
          data[0].start_time = sql_to_datetime(data[0].start_time)
          data[0].end_time = sql_to_datetime(data[0].end_time)
        }
        report.set(data[0]);
        edited = data[0];
      }
    } catch (err) {
      error_message = err.message;
    } finally {
      if (!$report) window.location.assign('./index')
      loading = false;
    }
  }
 
  const update = async () => {
    try {
      const { data, error } = await supabase.from('report')
        .update(edited).eq('report_number', report_number).eq('user_id', $user.id);
      if (error) { throw error } else { window.location.assign('./index') }
    } catch (err) {
      alert('Error while updating report')
    }
  };

  const remove = async () => {
    if (window.confirm('Delete this report?')) { 
      try {
        const { data, error } = await supabase.from('report')
          .delete().eq('report_number', report_number).eq('user_id', $user.id);
        if (error) { throw error } else { window.location.assign('./index') }
      } catch (err) {
        alert('Error while deleting report')
      }
    }
  };

  const tgl_compound_editor = () => compound_viewer = true

  const save_compounds = (e) => {
    compound_viewer = false;
    edited.compounds = e.detail.compounds
  }

  $: compound_added = (compound) => edited.compounds.includes(compound)

</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
  {#if compound_viewer}
    <Compounds_Modal
      modal_title={"Report compounds"}
      all_compounds={$user_compounds}
      report_compounds={edited.compounds}
      on:close={save_compounds}
    />
  {:else}
    <div id="Edit" class="Report">
      {#if error_message}
        <p class="Error">{error_message}</p>
      {/if}
      <h3>Editing report {report_number}</h3>
      <table>
        <tr>
          <th>Title</th>
          <td><input type="text" bind:value={edited.title} /></td>
        </tr>
        <tr>
          <th>Start</th>
          <td><input type="datetime-local" bind:value={edited.start_time}/></td>
        </tr>
        <tr>
          <th>End</th>
          <td><input type="datetime-local" bind:value={edited.end_time}/></td>
        </tr>
        <tr on:click={tgl_compound_editor}>
          <th>Compounds</th>
          {#if !edited.compounds || edited.compounds.length < 1}
            <td class="Expand">(Click to expand)</td>
          {:else}
            {#each edited.compounds as compound}
              <td class="Compounds">{compound}</td>
            {/each}
          {/if}
        </tr>
      </table>
      <div class="Article">
        <label for="article">Article</label>
        <textarea bind:value={edited.article} id="article" placeholder="(Optional)"></textarea>
      </div>
      <div class="Actions">
        <button on:click={remove}>Delete</button>
        <button on:click={update}>Update</button>
      </div>
    </div>
  {/if}
{/if}
