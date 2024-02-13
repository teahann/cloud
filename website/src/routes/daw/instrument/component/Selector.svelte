<script>
  export let label, opt_label, options, selection;
</script>

<div class="Setting">
  {#if !opt_label}<label for={label}>{label}</label>{/if}
  <select bind:value={selection} id={label || opt_label}>
    {#each options as option}
      <option value={option}>
        {option}
        {#if opt_label}{label}{/if}
      </option>
    {/each}
  </select>
</div>
