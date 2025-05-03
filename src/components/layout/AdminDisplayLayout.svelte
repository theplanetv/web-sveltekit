<script lang="ts">
  let { children } = $props();
</script>

<div class="drawer-content">
  <div class="my-8 flex flex-col justify-center items-center gap-y-8">
    {@render children()}
  </div>
</div>
