<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } })
</script>

<script>
  import { ARTICLES, STATE, fetchArticle } from '@/stores/articles'
  import { onMount } from 'svelte'

  // --- Props --------
  export let id

  // --- Computed -----
  $: article = $ARTICLES.find((article) => article.id === id) || {}

  // --- Lifecycle ----
  onMount(() => fetchArticle(id))
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

<Button class="$mt-2" icon="fas fa-chevron-left" to="/preview/xioni/article/list">
  Zurück zur Übersicht
</Button>
