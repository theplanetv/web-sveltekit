<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown';

  import Footer from '../../../components/footer/Footer.svelte';
  import PageLayout from '../../../components/layout/PageLayout.svelte';
  import Menu from '../../../components/menu/Menu.svelte';
  import type { PageProps } from './$types';
  import blogpostapi from '../../../lib/api/blogpost';
  import LoadingSpinner from '../../../components/loading/LoadingSpinner.svelte';

  const { data }: PageProps = $props();

  let source = $state<string>('');
  let loading = $state(true);

  $effect(() => {
    const fetchPost = async () => {
      loading = true;
      try {
        const post = await blogpostapi.GetWithSlug(data.slug);
        source = post.content;
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        loading = false;
      }
    };

    fetchPost();
  });
</script>

<PageLayout>
  <Menu />

  <article class="prose">
    {#if loading}
      <LoadingSpinner />
    {:else}
      <SvelteMarkdown {source} />
    {/if}
  </article>

  <Footer />
</PageLayout>
