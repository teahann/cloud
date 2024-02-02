<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let jobs = data.jobs;

</script>

<main>
  <table>
    <tr>
      <th>Name</th>
      <th>Salary</th>
    </tr>
    {#each jobs as job}
      <tr>
        <td>{job.name}</td>
        <td>{job.salary}</td>
      </tr>
    {/each}
  </table>
  <a href="../" class="Row Exit">Exit</a>
</main>
