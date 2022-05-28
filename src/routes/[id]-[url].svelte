<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } });
</script>

<script>
  import { articles, fetchArticle, state } from '@/stores/articles';
  import { onMount } from 'svelte';

  // --- Props --------
  export let id;

  // --- Computed -----
  $: article = $articles.find((article) => article.id === id && 'content' in article) || {};

  // --- Lifecycle ----
  onMount(async () => {
    if (article.id) return;
    await fetchArticle(id);
  });
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.title} />
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

{#if article.id && !$state.loading}
  <XioniArticle {...article} />
{:else}
  <XioniSceleton />
{/if}

<pre>{JSON.stringify(article, null, 2)}</pre>

<Button icon="fas fa-chevron-left" href="/">Zurück zur Übersicht</Button>
