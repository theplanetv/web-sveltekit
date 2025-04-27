<script lang="ts">
  let { current_page, max_page } = $props();
</script>

<div class="justify-center join">
  {#if current_page > 1}
    <button class={`join-item btn btn-primary ${current_page === 1 ? '' : 'btn-soft'}`} onclick={() => current_page = 1}>
      1
    </button>
  {/if}

  <button class="join-item btn btn-primary">{current_page}</button>

  {#if current_page < max_page}
    <button
      class={`join-item btn btn-primary ${current_page === max_page ? '' : 'btn-soft'}`}
      onclick={() => current_page = max_page}
    >
      {max_page}
    </button>
  {/if}
</div>