<script>
  import { user } from '@/utils/user.js'
</script>

{#if $user.id}
  <slot />
{:else}
  <div id="List">
    <a href="/account">Login to continue</a>
  </div>
{/if}
