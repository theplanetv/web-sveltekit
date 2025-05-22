<script lang="ts">
  let { size = 'xl' } = $props();
</script>

{#if size === 'xs'}
  <span class="loading loading-spinner loading-xs"></span>
{:else if size === 'sm'}
  <span class="loading loading-spinner loading-sm"></span>
{:else if size === 'md'}
  <span class="loading loading-spinner loading-md"></span>
{:else if size === 'lg'}
  <span class="loading loading-spinner loading-lg"></span>
{:else if size === 'xl'}
  <span class="loading loading-spinner loading-xl"></span>
{/if}
