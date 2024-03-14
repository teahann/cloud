<!-- TODO:: Compound Modal -->
<script>
  import { onMount } from 'svelte'
  import { supabase } from '@/utils/supabase.js'
  import { user } from '@/utils/user.js'
  import Comopunds_Modal from '@/components/Comopunds_Modal.svelte'
  import { datetime_to_sql, today_datetime} from '@/utils/dates.js'

  onMount(() => get_report_number())

  const report = { title: '', article: '', compounds: [], number: 0 };
  const time = { start: today_datetime(), end: today_datetime() }
  let loading = false;
  let error_message = null;

  const get_report_number = async () => {
    try {
      loading = true;
      const { data, error } = await supabase.from('report')
        .select('report_number').eq('user_id', $user.id)
        .order('report_number', { ascending: false }).limit();
      if (error) {
        throw error;
      } else {
        data.length > 0 ? report.number = data[0].report_number + 1 : report.number = 1;
      }
    } catch (err) {
      error_message = err.message;
    } finally {
      loading = false;
    }
  };

  const entry_valid = () => {
    let is_valid = false;
    report.title.length < 1 ? error_message = 'Report title required' : is_valid = true;
    return is_valid;
  };

  const make_query = () => {
    return {
      user_id: $user.id,
      start_time: datetime_to_sql(time.start),
      end_time: datetime_to_sql(time.end),
      title: report.title,
      article: report.article,
      report_number: report.number,
      compounds: []
    }
  }

  const create = async () => {
    if (entry_valid()) {
      try {
        loading = true;
        const { data, error } = await supabase.from('report').insert(make_query())
        if (error) { throw error } else { window.location.assign('./index') }
      } catch (err) {
        error_message = err.message;
      } finally {
        loading = false;
      }
    }
  };

  const tgl_compound_editor = () => console.log('Open/close compound editor')

</script>

{#if loading}
  <div id="Loading">
    <img src="/assets/loading.svg" alt="Loading" />
  </div>
{:else}
  <div id="Edit" class="Report">
    {#if error_message}
      <p class="Error">{error_message}</p>
    {/if}
    <h3>Report {report.number}</h3>
    <table>
      <tr>
        <th>Title</th>
        <td><input type="text" bind:value={report.title} /></td>
      </tr>
      <tr>
        <th>Start</th>
        <td><input type="datetime-local" bind:value={time.start}/></td>
      </tr>
      <tr>
        <th>End</th>
        <td><input type="datetime-local" bind:value={time.end} /></td>
      </tr>
      <tr on:click={tgl_compound_editor}>
        <th>Compounds</th>
        <td class="Expand">(Coming soon)</td>
      </tr>
    </table>
    <div class="Article">
      <label for="article">Article</label>
      <textarea bind:value={report.article} id="article" placeholder="(Optional)"></textarea>
    </div>
    <div class="Actions">
      <button on:click={create}>Submit</button>
    </div>
  </div>
{/if}