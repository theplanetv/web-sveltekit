<script lang="ts">
  let { children } = $props();
</script>

<div class="drawer lg:drawer-open">
  {@render children()}
</div>

