<script lang="ts">
  let { children } = $props();
</script>

<div class="flex flex-col items-center gap-y-8 xl:mx-50">
  {@render children()}
</div>
