<script lang="ts">
  import { goto } from "$app/navigation";
  import auth from "$lib/api/auth";
  import H1 from "../../components/heading/H1.svelte";
  import AdminDisplayLayout from "../../components/layout/AdminDisplayLayout.svelte";
  import AdminPageLayout from "../../components/layout/AdminPageLayout.svelte";
  import LoadingSpinner from "../../components/loading/LoadingSpinner.svelte";
  import MenuAdmin from "../../components/menu/MenuAdmin.svelte";
  import MenuAdminToggle from "../../components/menu/MenuAdminToggle.svelte";

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
<AdminPageLayout>
  <MenuAdmin />
  <MenuAdminToggle />

  <AdminDisplayLayout>
    <H1>Admin Page</H1>
  </AdminDisplayLayout>
</AdminPageLayout>
{/if}