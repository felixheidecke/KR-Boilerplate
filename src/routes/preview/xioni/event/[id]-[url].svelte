<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } })
</script>

<script>
  import { EVENTS, fetchEvent, STATE } from '@/stores/events'
  import { onMount } from 'svelte'

  // --- Props --------
  export let id

  // --- Computed -----
  $: article = $EVENTS.find((event) => event.id === id) || {}

  // --- Lifecycle ----
  onMount(() => fetchEvent(id))
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

<Button class="$mt-2" icon="fas fa-chevron-left" to="/xioni/article-list">
  Zurück zur Übersicht
</Button>
