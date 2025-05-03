<script lang="ts">
  import { goto } from "$app/navigation";
  import auth from "$lib/api/auth";
  import H1 from "../../../../components/heading/H1.svelte";
  import LoadingSpinner from "../../../../components/loading/LoadingSpinner.svelte";
  import MenuAdmin from "../../../../components/menu/MenuAdmin.svelte";
  import blogtagapi from "$lib/api/blogtag";
  import { FormStatus, type BlogTag } from "$lib/types";
  import Pagination from "../../../../components/pagination/Pagination.svelte";
  import AdminPageLayout from "../../../../components/layout/AdminPageLayout.svelte";
  import AdminDisplayLayout from "../../../../components/layout/AdminDisplayLayout.svelte";
  import MenuAdminToggle from "../../../../components/menu/MenuAdminToggle.svelte";
  import FormTag from "../../../../components/form/FormTag.svelte";
  import ToastAdmin from "../../../../components/toast/ToastAdmin.svelte";

  // Page state automation
  let verified = $state(false);
  let loading = $state(true);

  // Data state interaction
  let limit = $state(10);
  let page = $state(1);
  let search_input = $state('');
  let search = $state('');
  let count = $state(0);
  let max_page = $derived(Math.ceil(count / limit));
  let tags = $state<BlogTag[]>([]);
  let refetch = $state(false);

  // Toast state interaction
  let showToast = $state(false);
  let toastMessage = $state("");
  let toastStatus = $state<"success" | "error">("success");

  // Form state interaction
  let formStatus = $state<FormStatus>(FormStatus.ADD);
  let inputTag = $state<BlogTag>({ id: "", name: "" });

  $inspect(page);

  $effect(() => {
    const fetchData = async () => {
      const success = await auth.Verify();
      if (!success) {
        goto('/login');
      } else {
        verified = true;
      }
      loading = false;

      const count_data = await blogtagapi.Count(search);
      count = count_data;
      const tags_data = await blogtagapi.GetAll(limit, page, search);
      tags = tags_data;
      refetch = false;
    }
    fetchData();

    refetch;
    page;
    search;
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
    <FormTag
      formStatus={formStatus}
      bind:refetch={refetch}
      bind:showToast={showToast}
      bind:toastMessage={toastMessage}
      bind:toastStatus={toastStatus}
      bind:inputTag={inputTag}
    />

    <div class="flex flex-row justify-between">
      <H1>Tags Management</H1>
    </div>

    <div class="w-1/3 flex justify-between">
      <div>
        <button
          class="btn btn-success"
          onclick={
            () => {
              (document.getElementById('blog_tag_form') as HTMLDialogElement)?.showModal();
              formStatus = FormStatus.ADD;
            }
          }
        >
          Add
        </button>
      </div>

      <div class="flex gap-x-2">
        <input class="input" bind:value={search_input} />
        <button class="btn btn-primary" onclick={() => search = search_input}>Search</button>
      </div>
    </div>

    <!-- Table -->
    {#if count > 0}
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each tags as tag, index}
          <tr>
            <th>{index + 1}</th>
            <td>{tag.name}</td>
            <td>
              <button
                class="btn btn-info"
                onclick={() => {
                  (document.getElementById('blog_tag_form') as HTMLDialogElement)?.showModal();
                  const newTag: BlogTag = { id: tag.id, name: tag.name };
                  inputTag = newTag;
                  formStatus = FormStatus.EDIT}
                }
              >
                Edit
              </button>

              <button
                class="btn btn-error"
                onclick={() => {
                  (document.getElementById('blog_tag_form') as HTMLDialogElement)?.showModal();
                  inputTag = tag;
                  formStatus = FormStatus.DELETE}
                }
              >
                Delete
              </button>
            </td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <Pagination bind:current_page={page} bind:max_page={max_page} />
    {:else}
    <div class="text-center py-8">
      <p class="text-lg">No tags found</p>
    </div>
    {/if}
  </AdminDisplayLayout>
</AdminPageLayout>
{/if}

{#if showToast}
  <ToastAdmin 
    message={toastMessage} 
    status={toastStatus}
    timeout={5000} 
  />
{/if}