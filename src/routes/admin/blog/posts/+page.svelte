<script lang="ts">
  import { goto } from "$app/navigation";
  import auth from "$lib/api/auth";
  import LoadingSpinner from "../../../../components/loading/LoadingSpinner.svelte";
  import MenuAdmin from "../../../../components/menu/MenuAdmin.svelte";

  let verified = $state(false);
  let loading = $state(true);

  $effect(() => {
    const fetchData = async () => {
      const success = await auth.Verify();
      if (!success) {
        goto('/login');
      } else {
        verified = true;
      }
      loading = false;
    }
    fetchData();
  });
</script>

{#if loading}
<div class="flex items-center justify-center h-screen">
  <LoadingSpinner size="xl" />
</div>
{:else if verified}
<MenuAdmin />
{/if}