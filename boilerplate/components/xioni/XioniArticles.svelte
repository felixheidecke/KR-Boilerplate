<script>
  import { onMount } from 'svelte';
  import { articles, groups, fetchArticles } from '@/stores/articles';
  import { classNameHelper } from '@/js/utils';

  import Button from '../Button.svelte';
  import Article from './XioniArticle.svelte';
  import Sceleton from './XioniSceleton.svelte';

  // --- Props ----------------------------------------

  export let id;
  export let limit = 100;
  export let author = false;
  export let date = false;
  export let expanded = false;
  export let detailPagePrefix = '';

  id = parseInt(id);
  limit = parseInt(limit);

  // --- Computed -------------------------------------

  $: listOfarticles = $articles.filter((a) => a.module === id) || [];

  // --- Lifecycle ------------------------------------

  onMount(async () => {
    if ($groups.includes(id)) return;
    await fetchArticles(id, { limit, expanded });
  });

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
</script>

<svelte:head>
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

<ul class={classNameHelper(['XioniArticles'], $$props)} id={`module-${id}`}>
  {#each listOfarticles as article}
    <li>
      <Article {...prepareArticle(article)} ex-class="-article" />
      {#if !expanded}
        <Button href={`${detailPagePrefix}/${article.id}-${article.slug}`} class="-read-more">... weiter lesen</Button>
      {/if}
    </li>
  {:else}
    <Sceleton />
  {/each}
</ul>

<style lang="scss" global>
  :where(.XioniArticles) {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .-meta {
      @include reset-list;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      font-style: italic;
      display: flex;
      gap: 0.333rem;
    }

    .-meta-author:before {
      content: 'Von: ';
    }

    .-picture img {
      max-width: 10rem;
      float: left;
      margin-right: 2rem;
    }

    .-picture img {
      max-width: 10rem;
      float: left;
      margin-right: 2rem;
    }

    // .-read-more { }
  }
</style>
