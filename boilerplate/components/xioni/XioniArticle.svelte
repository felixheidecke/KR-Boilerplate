<script>
  import { articles, fetchArticle, state } from '@/stores/articles';
  import { format } from 'date-fns';
  import { onMount } from 'svelte';

  // --- Props --------
  export let id;
  export let author = false;
  export let date = false;

  // --- Computed -----
  $: article = $articles.find((a) => a.id === parseInt(id)) || {};

  // --- Lifecycle ----
  onMount(() => {
    if (article.id) return;
    fetchArticle(id);
  });
</script>

<article class="XioniArticle" class:--is-loading={$state.loading} data-id={id}>
  {#if article.id}
    <h2 class="-title">
      {article.title}
    </h2>
    <div class="-meta">
      {#if author && article.author}
        <span class="-meta-author">Von {article.author}</span>
      {/if}
      {#if date && article.date}
        <time class="-meta-date">{format(article.date, 'dd.MM.yyyy')}</time>
      {/if}
    </div>
    {#if article.image}
      <Picture ex-class="-picture" src={article.image.srcSmall} tablet={article.image.src} alt={article.image.alt} />
    {/if}
    <div class="-teaser">
      {@html article.text}
    </div>
    {#if article.content.length}
      <div class="-text">
        {#each article.content as c}
          {#if c.image}
            <Picture ex-class="-text-picture" src={c.image.src} alt={c.image.alt} />
          {/if}
          {#if c.text}
            {@html c.text}
          {/if}
        {/each}
      </div>
    {/if}

    {#if article.pdf}
      <a href={article.pdf.src} class="-pdf" target="_blank" rel="follow" title={article.pdf.name}
        >{article.pdf.title}</a
      >
    {/if}

    {#if article.link}
      <a href={article.link} class="-link" rel="nofollow" target="_blank">{article.link}</a>
    {/if}
  {/if}
</article>

<style lang="scss" global>
  .XioniArticle {
    @if mixin-exists(XioniArticle-reset) {
      @include XioniArticle-reset;
    } @else {
      display: flow-root;

      .-meta-author,
      .-meta-date {
        display: inline-block;
      }

      .-picture img {
        max-width: 10rem;
        float: left;
        margin-right: 2rem;
      }

      .-text-picture img {
        max-width: 100%;
      }

      .-pdf {
        display: flex;
        align-items: center;

        svg {
          max-width: 1rem;
          max-height: 1rem;
          margin-right: 0.333rem;
        }
      }
    }

    @if mixin-exists(XioniArticle) {
      @include XioniArticle;
    }
  }
</style>
