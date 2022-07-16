<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } });
</script>

<script>
  import { ARTICLES, FETCH_ARTICLE, STATE } from '@/stores/articles';
  import { onMount } from 'svelte';

  // --- Data -------------------------

  export let id;

  // --- Computed ---------------------

  $: article = $ARTICLES.find((article) => article.id === id) || {};

  // --- Lifecycle --------------------

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
  <XioniSceleton />
{/if}

<Button icon="fas fa-chevron-left" href="/">Zurück zur Übersicht</Button>
