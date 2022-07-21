<script>
  import classnames from 'classnames';
  import { onMount } from 'svelte';
  import { ARTICLES, GROUPS, FETCH_ARTICLES, ERROR } from '@/stores/articles';

  // --- Components -----------------------------------

  import XioniArticle from './XioniArticle.svelte';
  import XioniSceleton from './XioniSceleton.svelte';
  import Button from '../Button.svelte';

  // --- Props ----------------------------------------

  export let id;
  export let limit = 100;
  export let author = false;
  export let date = false;
  export let expanded = false;
  export let detailPagePrefix = '';

  id = +id;
  limit = +limit;

  // --- Methods --------------------------------------

  /**
   * Set "unwanted" keys to null
   *
   * @param {object} article
   * @returns {object} updated article
   */

  const prepareArticle = (article) => {
    return {
      ...article,
      date: date ? article.date : null,
      author: author ? article.author : null,
      content: expanded ? article.content : null
    };
  };

  onMount(async () => {
    if ($GROUPS.includes(id)) return;
    await FETCH_ARTICLES(id, { limit, expanded });
  });

  // --- Data -------------------------------------

  $: listOfarticles = $ARTICLES.filter((a) => a.module === id) || [];

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniArticles';

  $: className = classnames(baseName, $$props.class);
</script>

<svelte:head>
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

{#if $ERROR}
  <h3>Ein Fehler ist aufgetreten</h3>
  <pre class={baseName + '__error'}>{JSON.stringify($ERROR, null, 2)}</pre>
{:else}
  {#each listOfarticles as article}
    <XioniArticle {...prepareArticle(article)} />
    {#if !expanded}
      <Button
        to={`${detailPagePrefix}/${article.id}-${article.slug}`}
        class={baseName + '__read-more'}
      >
        ... weiter lesen
      </Button>
    {/if}
  {:else}
    <XioniSceleton />
  {/each}
{/if}

<style lang="scss" global>
  :where(.XioniArticle + .XioniArticle) {
    margin-top: 1rem;
  }

  :where(.XioniArticles__read-more) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  :where(.XioniArticles__error) {
    background-color: rgba(red, 0.125);
    border: 1px dashed red;
    padding: 1rem;
  }
</style>
