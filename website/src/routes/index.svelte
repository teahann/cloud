<script>
  import { isActive } from '@roxi/routify'
</script>

<div id="List">
  <a href="/data" class:Open={$isActive('data')}>Data</a>
  <a href="/metabolic" class:Open={$isActive('metabolic')}>Metabolic</a>
  <a href="/resources" class:Open={$isActive('resources')}>Resources</a>
</div>
