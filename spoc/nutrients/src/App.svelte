<script lang="ts">
  import { writable } from 'svelte/store';
  import Food_Modal from './component/Food_Modal.svelte';

  const FOODS_API: string = import.meta.env.VITE_FOODS_API;
  const food_items: array = writable(new Array());
  let search_query: string = new String();
  let loading: boolean = false;
  let modal_index = -1;

  let timer_i: number = new Number();
  const fetch_delay: number = 300;

  const send = () => {
    clearTimeout(timer_i);
    timer_i = setTimeout(async () => {
      loading = true;
      try {
        const res = await fetch(FOODS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'query': search_query })
        });
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const data = await res.json();
        data.foods.length ? food_items.set(data.foods) : food_items.set([]);
      } catch (error) {
        hdl_err(error);
      } finally {
        console.log($food_items)
        loading = false;
      }
    }, fetch_delay);
  }

  const hdl_err = (err) => {
    if (err.message.includes("500")) alert('FoodData Central API error');
  }

  const str_max = (string, max) => {
    if (!string) return '';
    return string.length > max ? `${string.slice(0, max)}…` : string;
  }

  const view_item = (index) => modal_index = index;

  const close_modal = () => modal_index = -1;

</script>

{#if modal_index !== -1}
  <Food_Modal data={$food_items[modal_index]} on:close_modal={close_modal} />
{/if}

<main>
  <header>
    <label>Search:</label>
    <input
      bind:value={search_query}
      placeholder="Enter food name"
      on:keyup={send}
    />
  </header>
  <table class="Foods">
    {#if $food_items.length > 0}
      <tr>
        <th class="Name">Food</th>
        <th>Nutrients</th>
      </tr>
    {/if}
    {#each $food_items as item, i}
      <tr id={item.fdcId}
        class="Selectable"
        on:click={() => view_item(i)} >
        <td class="Name">
          <p>{str_max(item.brandOwner, 50)}</p>
          <p>{str_max(item.description, 50)}</p>
          <p>{str_max(item.foodCategory, 50)}</p>
        </td>
        <td class="Nutrients">
          <h3>({item.foodNutrients.length} nutrients)</h3>
          {#each item.foodNutrients as n}
            <p>{n.nutrientName}: {n.value}{n.unitName}</p>
          {/each}
        </td>
      </tr>
    {/each}
  </table>

</main>
