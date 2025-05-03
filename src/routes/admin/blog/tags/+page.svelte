<script lang="ts">
  import { goto } from "$app/navigation";
  import auth from "$lib/api/auth";
  import H1 from "../../../../components/heading/H1.svelte";
  import LoadingSpinner from "../../../../components/loading/LoadingSpinner.svelte";
  import MenuAdmin from "../../../../components/menu/MenuAdmin.svelte";
  import blogtagapi from "$lib/api/blogtag";
  import type { BlogTag } from "$lib/types";
  import Pagination from "../../../../components/pagination/Pagination.svelte";
  import AdminPageLayout from "../../../../components/layout/AdminPageLayout.svelte";
  import AdminDisplayLayout from "../../../../components/layout/AdminDisplayLayout.svelte";
  import MenuAdminToggle from "../../../../components/menu/MenuAdminToggle.svelte";
  import FormTag from "../../../../components/form/FormTag.svelte";
  import ToastAdmin from "../../../../components/toast/ToastAdmin.svelte";

  let verified = $state(false);
  let loading = $state(true);
  let showSelectDelete = $state(false);

  let showToast = $state(false);
  let toastMessage = $state("");
  let toastStatus = $state<"success" | "error">("success");

  let limit = $state(10);
  let page = $state(1);
  let search = $state('');
  let count = $state(0);
  let max_page = $derived(Math.ceil(count / limit));
  let tags = $state<BlogTag[]>([]);
  let refetch = $state(false);

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
      bind:refetch={refetch}
      bind:showToast={showToast}
      bind:toastMessage={toastMessage}
      bind:toastStatus={toastStatus}
    />

    <div class="flex flex-row justify-between">
      <H1>Tags Management</H1>
    </div>

    <div class="w-1/3 flex justify-between">
      <div>
        <button
          class="btn btn-success"
          onclick={
            () => (document.getElementById('blog_tag_form') as HTMLDialogElement)?.showModal()
          }
        >
          Add
        </button>
        <button class="btn btn-default" onclick={() => showSelectDelete = !showSelectDelete}>Select</button>
      </div>

      <div class="flex gap-x-2">
        <input class="input" />
        <button class="btn btn-primary">Search</button>
      </div>
    </div>

    <!-- Table -->
    {#if count > 0}
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <thead>
          <tr>
            {#if showSelectDelete}
            <th class="transition">
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            {/if}
            <th></th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each tags as tag, index}
          <tr>
            {#if showSelectDelete}
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            {/if}
            <th>{index + 1}</th>
            <td>{tag.name}</td>
            <td>
              <button class="btn btn-info">Edit</button>
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