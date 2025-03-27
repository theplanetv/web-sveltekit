<script>
  import MingCuteBook2Line from '../icons/MingCute-Book2Line.svelte';
  import MingCuteHome3Line from '../icons/MingCute-Home3Line.svelte';

  import { page } from '$app/state';

  const pathname = page.url.pathname;
</script>

<nav class="menu menu-horizontal rounded-box bg-base-200 my-5 flex p-1">
  <a href="/" class={`tooltip tooltip-bottom rounded-box p-2 hover:bg-gray-300 ${pathname === '/' ? 'bg-gray-200' : ''}`} data-tip="Home"
    ><MingCuteHome3Line /></a
  >
  <a
    href="/posts/"
    class={`tooltip tooltip-bottom rounded-box p-2 hover:bg-gray-300 ${pathname === '/posts' ? 'bg-gray-200' : ''}`}
    data-tip="Blog Post"
    ><MingCuteBook2Line />
  </a>
</nav>
