<script>
  import { onMount } from 'svelte'
  import { ARTICLES, FETCH_ARTICLES, ERROR } from '@/stores/articles'

  // --- Components -----------------------------------

  import XioniArticle from './XioniArticle.svelte'
  import Sceleton from './partials/Sceleton.svelte'
  import Button from '../Button.svelte'

  // --- Props ----------------------------------------

  export let author = false
  export let date = false
  export let expanded = false
  export let pdf = false
  export let id
  export let limit = 100

  $: buttonText = $$props['button-text'] || 'Weiterlesen'
  $: detailPath = $$props['detail-path'] || ''

  id = +id
  limit = +limit

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
      pdf: pdf ? article.pdf : null,
      content: expanded ? article.content : null
    }
  }

  onMount(() => FETCH_ARTICLES(id, { limit, expanded }))

  // --- Data -------------------------------------

  $: listOfarticles =
    $ARTICLES.filter((a) => a.module === id).splice(0, limit) || []
</script>

<svelte:head>
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

<div class="XioniArticleList">
  {#if $ERROR}
    <h3>Ein Fehler ist aufgetreten</h3>
    <pre class="XioniArticleList__error">{JSON.stringify($ERROR, null, 2)}</pre>
  {:else}
    {#each listOfarticles as article}
      <XioniArticle {...prepareArticle(article)}>
        <span slot="append">
          {#if !expanded}
            <Button
              to={`${detailPath}/${article.id}-${article.slug}`}
              class="XioniArticle__read-more"
              icon="fas fa-chevron-right"
              reverse
            >
              {buttonText}
            </Button>
          {/if}
        </span>
      </XioniArticle>
    {:else}
      <Sceleton />
    {/each}
  {/if}
</div>

<style lang="scss" global>
  :where(.XioniArticleList) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  :where(.XioniArticle__read-more) {
    clear: both;
  }

  :where(.XioniArticle__error) {
    background-color: rgba(red, 0.125);
    border: 1px dashed red;
    padding: 1rem;
  }
</style>
