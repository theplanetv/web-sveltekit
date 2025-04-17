<script lang="ts">
  import { goto } from '$app/navigation';
  import H1 from '../../components/heading/H1.svelte';
  import MingCuteKey2Line from '../../components/icons/MingCute-Key2Line.svelte'; 
  import MingCuteUser1Line from '../../components/icons/MingCute-User1Line.svelte';
  import PageLayout from '../../components/layout/PageLayout.svelte';
  import LoadingSpinner from '../../components/loading/LoadingSpinner.svelte';

  import auth from '../../lib/api/auth';

  let username = $state('');
  let password = $state('');
  let verified = $state(false);
  let loading = $state(true);

  $effect(() => {
    const fetchData = async () => {
      const success = await auth.Verify();
      if (success) {
        goto('/admin');
      } else {
        verified = true;
      }
      loading = false;
    }
    fetchData();
  });

  async function handleLogin() {
    loading = true;
    const success = await auth.Login(username, password);
    loading = false;
    
    if (success) {
      goto('/admin');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }
</script>

<PageLayout>
  {#if loading}
  <div class="flex items-center justify-center h-screen">
    <LoadingSpinner size="xl" />
  </div>
  {:else if verified}
  <div class="flex flex-col h-screen justify-center">
    <div class="flex flex-col gap-y-6 p-10 rounded-lg shadow-md justify-center">
      <H1>Login</H1>

      <div class="flex flex-col gap-y-2">
        <label class="input">
          <MingCuteUser1Line />
          <input type="text" placeholder="Username" bind:value={username} />
        </label>

        <label class="input">
          <MingCuteKey2Line />
          <input type="password" placeholder="Password" bind:value={password} />
        </label>
      </div>

      <button class="btn btn-primary" onclick={handleLogin} disabled={loading}>
        {#if loading}
          <LoadingSpinner size="sm" />
        {:else}
          Login
        {/if}
      </button>
    </div>
  </div>
  {/if}
</PageLayout>