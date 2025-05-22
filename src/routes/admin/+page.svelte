<script lang="ts">
  import { goto } from '$app/navigation';
  import auth from '$lib/api/auth';
  import H1 from '../../components/heading/H1.svelte';
  import PageLayout from '../../components/layout/PageLayout.svelte';
  import LoadingSpinner from '../../components/loading/LoadingSpinner.svelte';

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
    };
    fetchData();
  });
</script>

<PageLayout>
  {#if loading}
    <div class="flex h-screen items-center justify-center">
      <LoadingSpinner size="xl" />
    </div>
  {:else if verified}
    <H1>Admin</H1>
  {/if}
</PageLayout>
