<script>
  import H1 from '../../components/heading/H1.svelte';
  import MingCuteKey2Line from '../../components/icons/MingCute-Key2Line.svelte'; 
  import MingCuteKey2LineCustomStroke from '../../components/icons/MingCute-Key2LineCustomStroke.svelte';
  import MingCuteUser1Line from '../../components/icons/MingCute-User1Line.svelte';
  import PageLayout from '../../components/layout/PageLayout.svelte';

  let togglePassword = $state(false);
</script>

<PageLayout>
  <div class="flex flex-col h-screen justify-center">
    <div class="flex flex-col gap-y-6 p-10 rounded-lg shadow-md justify-center">
      <H1>Login</H1>

      <div class="flex flex-col gap-y-2">
        <label class="input">
          <MingCuteUser1Line />
          <input type="text" placeholder="Username" />
        </label>
    
        <label class="input">
          <button class="cursor-pointer" type="button" onclick={(event) => {
            event.preventDefault();
            togglePassword = !togglePassword;
          }}>
          {#if !togglePassword}
            <MingCuteKey2Line />
          {:else}
            <MingCuteKey2LineCustomStroke />
          {/if}
          </button>
          <input type={togglePassword ? "text" : "password"} placeholder="Password" />
        </label>
      </div>
  
      <button class="btn btn-primary">Login</button>
    </div>
  </div>
</PageLayout>