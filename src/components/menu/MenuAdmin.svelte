<script lang="ts">
  import H1 from "../heading/H1.svelte";
  import { page } from "$app/state";

  let pathname = page.url.pathname;
</script>

<input id="admin-menu" type="checkbox" class="drawer-toggle" />

<div class="drawer-side">
  <label for="admin-menu" aria-label="close sidebar" class="drawer-overlay"></label>
  <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    <div class="flex items-center justify-center">
      <H1><a href="/admin">Admin</a></H1>
    </div>

    <li class="my-8 menu-item">
      <details open>
        <summary class="group">Blog management</summary>
        <li><a class={pathname === "/admin/blog/tags" ? "bg-primary text-white" : ""} href="/admin/blog/tags">Tags</a></li>
        <li><a class={pathname === "/admin/blog/posts" ? "bg-primary text-white" : ""} href="/admin/blog/posts">Posts</a></li>
      </details>
    </li>
  </ul>
</div>
