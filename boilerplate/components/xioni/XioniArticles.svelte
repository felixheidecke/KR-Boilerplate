<script>
  import classnames from 'classnames';
  import { onMount } from 'svelte';
  import { articles, groups, fetchArticles } from '@/stores/articles';

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
    if ($groups.includes(id)) return;
    await fetchArticles(id, { limit, expanded });
  });

  // --- Data -------------------------------------

  $: listOfarticles = $articles.filter((a) => a.module === id) || [];

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniArticles';

  $: className = classnames(baseName, $$props.class);
</script>

<svelte:head>
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

<ul class={className} id={`module-${id}`}>
  {#each listOfarticles as article}
    <li class={baseName + '__article'}>
      <XioniArticle {...prepareArticle(article)} />
      {#if !expanded}
        <Button
          href={`${detailPagePrefix}/${article.id}-${article.slug}`}
          class={baseName + '__read-more'}
        >
          ... weiter lesen
        </Button>
      {/if}
    </li>
  {:else}
    <XioniSceleton />
  {/each}
</ul>

<style lang="scss" global>
  :where(.XioniArticles) {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .XioniArticle__meta {
      @include reset-list;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      font-style: italic;
      display: flex;
      gap: 0.333rem;
    }

    .XioniArticle__author:before {
      content: 'Von: ';
    }

    .XioniArticle__image img {
      max-width: 10rem;
      float: left;
      margin-right: 2rem;
    }
  }
</style>
