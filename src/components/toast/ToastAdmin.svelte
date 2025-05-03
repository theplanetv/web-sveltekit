<script lang="ts">
  import MingCuteCloseLine from "../icons/MingCute-CloseLine.svelte";

  let { message, status, timeout = 5000 } = $props();

  let showToast = $state(true);
  let timeoutId: number;

  function closeToast() {
    showToast = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  $effect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    showToast = true;
    timeoutId = setTimeout(() => {
      showToast = false;
    }, timeout);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });
</script>

<div class="toast">
  <div 
    class={`
      alert 
      ${status === "success" ? "alert-success" : "alert-error"}
      transform transition-all duration-300 ease-in-out
      ${showToast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
    `}
  >
    <span>{message}</span>
    <button onclick={closeToast}>
      <MingCuteCloseLine />
    </button>
  </div>
</div>
