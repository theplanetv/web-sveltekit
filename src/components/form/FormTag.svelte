<script lang="ts">
  import blogtag from "$lib/api/blogtag";
  import { ApiMessage } from "$lib/api/message";
  import { FormStatus, type BlogTag } from "$lib/types";

  let {
    formStatus,
    refetch = $bindable(false),
    toastMessage = $bindable(""),
    toastStatus = $bindable("success"),  
    showToast = $bindable(false),
    inputTag = $bindable<BlogTag>({ id: "", name: "" }),
  } = $props();

  const submitForm = async (event: Event) => {
    event.preventDefault();

    if (formStatus === FormStatus.ADD) {
      const input: BlogTag = { id: "", name: inputTag.name };
      const response = await blogtag.Create(input);

      // Check for success and close
      if (response.message === ApiMessage.CREATE_SUCCESS) {
        refetch = true;
        inputTag = { id: "", name: "" };
      }

      // Set toast state after form actions
      toastMessage = response.message;
      toastStatus = response.message === ApiMessage.CREATE_SUCCESS ? "success" : "error";
    } else if (formStatus === FormStatus.EDIT) {
      const input: BlogTag = { id: inputTag.id, name: inputTag.name };
      const response = await blogtag.Update(input);

      if (response.message === ApiMessage.UPDATE_SUCCESS) {
        refetch = true;
        inputTag = { id: "", name: "" };
      }

      // Set toast state after form actions
      toastMessage = response.message;
      toastStatus = response.message === ApiMessage.UPDATE_SUCCESS ? "success" : "error";
    } else if (formStatus === FormStatus.DELETE) {
      const response = await blogtag.Delete(inputTag.id);

      if (response.message === ApiMessage.DELETE_SUCCESS) {
        refetch = true;
      }

      // Set toast state after form actions
      toastMessage = response.message;
      toastStatus = response.message === ApiMessage.DELETE_SUCCESS ? "success" : "error";
    }
    (document.getElementById('blog_tag_form') as HTMLDialogElement)?.close();

    // Toggle showToast off and then on to force re-render
    showToast = false;
    setTimeout(() => {
      showToast = true;
    }, 10);
  }
</script>

<dialog id="blog_tag_form" class="modal">
  <form class="modal-box flex flex-col gap-4" method="dialog" onsubmit={submitForm}>
    <h2 class="text-2xl text-center font-bold">
      {formStatus === FormStatus.ADD ? "Add" : formStatus === FormStatus.EDIT ? "Edit" : "Delete"}
      Tag
    </h2>

    {#if formStatus === FormStatus.DELETE}
    <p class="text-center">Are you sure you want to delete this tag?</p>
    {/if}

    <div class="flex justify-center items-center gap-2">
      <label for="name">Name</label>
      {#if formStatus !== FormStatus.DELETE}
      <input type="text" minlength="1" id="name" class="input input-bordered w-full max-w-xs" bind:value={inputTag.name} />
      {:else}
      <input type="text" minlength="1" id="name" class="input input-bordered w-full max-w-xs" bind:value={inputTag.name} disabled />
      {/if}
    </div>

    <div class="flex justify-end gap-2">
      <button class="btn" type="button"
        onclick={
          () => {
            inputTag = { id: "", name: "" };
            (document.getElementById('blog_tag_form') as HTMLDialogElement)?.close();
          }
        }
      >
        Close
      </button>
      {#if formStatus === FormStatus.ADD}
      <button class="btn btn-success" type="submit">Add</button>
      {:else if formStatus === FormStatus.EDIT}
      <button class="btn btn-info" type="submit">Edit</button>
      {:else if formStatus === FormStatus.DELETE}
      <button class="btn btn-error" type="submit">Delete</button>
      {/if}
    </div>
  </form>
</dialog>