<script lang="ts">
  import blogtag from "$lib/api/blogtag";
  import { ApiMessage } from "$lib/api/message";

  let {
    refetch = $bindable(false),
    toastMessage = $bindable(""),
    toastStatus = $bindable("success"),  
    showToast = $bindable(false),
  } = $props();
  let name = $state("");

  const submitAddTag = async (event: Event) => {
    event.preventDefault();
    const success = await blogtag.Create(name);

    // Check for success and close
    if (success.message === ApiMessage.CREATE_SUCCESS) {
      refetch = true;
      name = "";
    }
    (document.getElementById('blog_tag_form') as HTMLDialogElement)?.close();

    // Set toast state after form actions
    toastMessage = success.message;
    toastStatus = success.message === ApiMessage.CREATE_SUCCESS ? "success" : "error";

    // Toggle showToast off and then on to force re-render
    showToast = false;
    setTimeout(() => {
      showToast = true;
    }, 10);
  }
</script>

<dialog id="blog_tag_form" class="modal">
  <form class="modal-box flex flex-col gap-4" method="dialog" onsubmit={submitAddTag}>
    <h2 class="text-2xl text-center font-bold">Add Tag</h2>

    <div class="flex justify-center items-center gap-2">
      <label for="name">Name</label>
      <input type="text" minlength="1" id="name" class="input input-bordered w-full max-w-xs" bind:value={name} />
    </div>

    <div class="flex justify-end gap-2">
      <button class="btn" type="button"
        onclick={
          () => {
            name = "";
            (document.getElementById('blog_tag_form') as HTMLDialogElement)?.close();
          }
        }
      >
        Close
      </button>
      <button class="btn btn-success" type="submit">Add</button>
    </div>
  </form>
</dialog>