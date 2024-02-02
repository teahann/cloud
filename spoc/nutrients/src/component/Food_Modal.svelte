<script>
  import { createEventDispatcher } from 'svelte';
  export let data

  const dispatch = createEventDispatcher();
  
  const close_modal = () => dispatch('close_modal') 
</script>

<div class="Modal">
  <div class="Container">
    <h2>{data.dataType} food item ({data.fdcId})</h2>
    <p>Description: {data.description}</p>
    <p>Microbes: {data.microbes.length}</p>
    {#if data.dataType === 'Branded'}
      <p>{data.brandName}</p>
      <p>{data.dataSource}</p>
      <p>{data.foodCategory}</p>
      <p>Nutrients:{data.foodNutrients.length}</p>
      <p>{data.gtinUpc}</p>
      <p>{data.ingredients}</p>
      <p>{data.marketCountry}</p>
      <p>Package weight:{data.packageWeight}</p>
      <p>Serving size:{data.servingSize} {data.servingSizeUnit}</p>
    {:else if data.dataType === 'SR Legacy'}
      <p>{data.additionalDescriptions}</p>
      <p>{data.allHighlightFields}</p>
      <p>{data.commonNames}</p>
      <p>Input foods: {data.finalFoodInputFoods.length}</p>
      <p>Attribute types: {data.foodAttributeTypes.length}</p>
      <p>Food attributes: {data.foodAttributes.length}</p>
      <p>{data.foodCategory}</p>
      <p>Food measures: {data.foodMeasures.length}</p>
      <p>Nutrients: {data.foodNutrients.length}</p>
      <p>Food version IDs: {data.foodVersionIds.length}</p>
      <p>NDB number: {data.ndbNumber}</p>
      <p>Published: {data.publishedDate}</p>
    {:else if data.dataType === 'Survey (FNDDS)'}
      <p>{data.additionalDescriptions}</p>
      <p>{@html data.allHighlightFields}</p>
      <p>{data.commonNames}</p>
      <p>Input foods: {data.finalFoodInputFoods.length}</p>
      <p>Attribute types: {data.foodAttributeTypes.length}</p>
      <p>Food attributes: {data.foodAttributes.length}</p>
      <p>{data.foodCategory}</p>
      <p>Food Code:{data.foodCode}</p>
      <p>Food measures: {data.foodMeasures.length}</p>
      <p>Nutrients: {data.foodNutrients.length}</p>
      <p>{data.foodVersionIds}</p>
    {:else if data.dataType === 'Experimental'}
      <p>{@html data.allHighlightFields}</p>
      <p>Input foods: {data.finalFoodInputFoods.length}</p>
      <p>Attribute types: {data.foodAttributeTypes.length}</p>
      <p>Food attributes: {data.foodAttributes.length}</p>
      <p>Food measures: {data.foodMeasures.length}</p>
      <p>Version IDs: {data.foodVersionIds}</p>
      <p>Published: {data.publishedDate}</p>
      <p>Tags: {data.tags.length}</p>
    {:else if data.dataType === 'Foundation'}
      <p>{data.additionalDescriptions}</p>
      <p>{data.allHighlightFields}</p>
      <p>{data.commonNames}</p>
      <p>Input foods: {data.finalFoodInputFoods.length}</p>
      <p>Attribute types: {data.foodAttributeTypes.length}</p>
      <p>Food attributes: {data.foodAttributes.length}</p>
      <p>{data.foodCategory}</p>
      <p>Food measures: {data.foodMeasures.length}</p>
      <p>Nutrients: {data.foodNutrients.length}</p>
      <p>Version IDs: {data.foodVersionIds.length}</p>
      <p>Acquisition date: {data.mostRecentAcquisitionDate}</p>
      <p>Published: {data.publishedDate}</p>
    {:else}
      <p>No UI element for this data type 😳</p>
    {/if}
    <div class="Actions">
      <button on:click={close_modal}>Close</button>
    </div>
  </div>
</div>
