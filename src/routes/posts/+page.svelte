<script lang="ts">
  import Svelecte from 'svelecte';

  import Footer from '../../components/footer/Footer.svelte';
  import PageLayout from '../../components/layout/PageLayout.svelte';
  import Menu from '../../components/menu/Menu.svelte';
  import MingCuteSearch2Line from '../../components/icons/MingCute-Search2Line.svelte';
  import blogtagapi from '$lib/api/blogtag';
  import blogpostapi from '$lib/api/blogpost';
  import type { BlogTag } from '$lib/types';
  import { formatDate } from '$lib/utils/date';

  type BlogPost = {
    title: string;
    slug: string;
    created_at: string;
    updated_at: string;
    tags: BlogTag[];
  };

  let count_tags = $state(0);
  let selected_tags: string[] = $state([]);
  let data_tags: string[] = $state([]);

  let limit_posts = $state(10);
  let page_posts = $state(1);
  let count_posts = $state(0);
  let search_post: string = $state('');
  let data_posts: BlogPost[] = $state([]);

  $effect(() => {
    const fetchTags = async () => {
      count_tags = await blogtagapi.Count('');

      let get_tags: BlogTag[] = [];
      for (let tag_page = 1; tag_page <= Math.ceil(count_tags / 50); tag_page++) {
        const get_data: BlogTag[] = await blogtagapi.GetAll(50, tag_page, '');
        get_tags = [...get_tags, ...get_data];
      }
      data_tags = get_tags.map((tag) => tag.name);
    };
    fetchTags();
  });

  $effect(() => {
    const fetchPosts = async () => {
      count_posts = await blogpostapi.Count(search_post);
      let get_posts: BlogPost[] = await blogpostapi.GetAll(limit_posts, page_posts, search_post);
      data_posts = get_posts;
    };
    fetchPosts();
  });
</script>

<PageLayout>
  <Menu />

  <main class="flex flex-col gap-y-5">
    <h1 class="text-center text-3xl font-bold">My blog posts!</h1>

    <div class="input w-full">
      <MingCuteSearch2Line />
      <input type="text" placeholder="Post name" bind:value={search_post} />
    </div>

    <Svelecte
      bind:value={selected_tags}
      multiple
      options={data_tags}
      placeholder="Tags"
    />

    <ul class="flex flex-col gap-y-5">
      {#each data_posts as post (post.title)}
        <a
          href={`/posts/${encodeURIComponent(post.slug)}`}
          class="card flex flex-col gap-y-2 shadow-sm hover:cursor-pointer hover:shadow-lg"
        >
          <li class="card-body">
            <h2 class="card-title">{post.title}</h2>
            <div class="grid grid-cols-2">
              <p>Created at: {formatDate(post.created_at)}</p>
              <p class="text-right">Updated at: {formatDate(post.updated_at)}</p>
            </div>
            {#if post.tags && post.tags.length > 0}
              <div class="mt-2 flex flex-wrap gap-1">
                {#each post.tags as tag}
                  <span class="badge badge-soft badge-info text-xs">{tag.name}</span>
                {/each}
              </div>
            {/if}
          </li>
        </a>
      {/each}
    </ul>

    <div class="justify-center join">
      {#if page_posts > 1}
        <button class={`join-item btn btn-primary ${page_posts === 1 ? '' : 'btn-soft'}`} onclick={() => page_posts = 1}>
          1
        </button>
      {/if}

      <button class="join-item btn btn-primary">{page_posts}</button>

      {#if page_posts < Math.ceil(count_posts / limit_posts)}
        <button
          class={`join-item btn btn-primary ${page_posts === Math.ceil(count_posts / limit_posts) ? '' : 'btn-soft'}`}
          onclick={() => page_posts = Math.ceil(count_posts / limit_posts)}
        >
          {Math.ceil(count_posts / limit_posts)}
        </button>
      {/if}
    </div>
  </main>

  <Footer />
</PageLayout>
