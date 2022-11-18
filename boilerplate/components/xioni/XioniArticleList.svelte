<script>
  import { onMount } from 'svelte'
  import { ARTICLES, IS_LOADING, fetchArticles } from '@/stores/articles'

  // --- Components -----------------------------------

  import XioniArticle from './XioniArticle.svelte'
  import Sceleton from '../auxiliary/Sceleton.svelte'
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

  const module = +id
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
      content: expanded ? article.content : []
    }
  }

  onMount(() => fetchArticles(module, { limit }))

  // --- Data -------------------------------------

  $: articles = $ARTICLES.filter((event) => event.module === module).splice(0, limit) || []
</script>

<svelte:head>
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

{#if $IS_LOADING}
  <Sceleton />
{:else}
  {#each articles as article}
    <XioniArticle {...prepareArticle(article)}>
      <span>
        {#if !expanded}
          <Button
            to={`${detailPath}${article.id}-${article.slug}`}
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
    <p class="XioniArticleList__is-empty">Keine Artikel gefunden …</p>
  {/each}
{/if}

<style lang="scss" global>
  :where(.XioniArticle) + :where(.XioniArticle) {
    margin-top: 1rem;
  }

  :where(.XioniArticle__read-more) {
    clear: both;
  }

  :where(.XioniArticle__error) {
    background-color: rgba(red, 0.125);
    border: 1px dashed red;
    padding: 1rem;
  }

  :where(.XioniArticleList__is-empty) {
    text-align: center;
    font-style: italic;
    background-color: rgb(234, 234, 234);
    border-radius: 1rem;
    padding: 1rem;
  }
</style>
