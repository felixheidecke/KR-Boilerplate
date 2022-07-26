<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } });
</script>

<script>
  import { ARTICLES, FETCH_ARTICLE, STATE } from '@/stores/articles';
  import { onMount } from 'svelte';

  // --- Props --------
  export let id;

  // --- Computed -----
  $: article =
    $ARTICLES.find((article) => article.id === id && 'content' in article) ||
    {};

  // --- Lifecycle ----
  onMount(async () => {
    if (article.id) return;
    await FETCH_ARTICLE(id);
  });
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.title} />
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

{#if article.id && !$STATE.loading}
  <XioniArticle {...article} />
{:else}
  <Sceleton />
{/if}

<Button
  class="$mt-2"
  icon="fas fa-chevron-left"
  to="/preview/xioni-article-list"
>
  Zurück zur Übersicht
</Button>
