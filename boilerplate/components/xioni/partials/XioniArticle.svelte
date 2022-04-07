<script>
  import { articles, fetchArticle } from '../store';
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

<!-- <pre>
  {JSON.stringify(article, '  ', 2)}
</pre> -->

{#if article.id}
  <article class="XioniArticle" data-id={id}>
    <h2 class="-title">
      {article.title}
    </h2>
    <ul class="-meta">
      {#if author && article.author}
        <li class="-meta-author">Von {article.author}</li>
      {/if}
      {#if date && article.date}
        <li class="-meta-date">
          <time>{format(article.date, 'dd.MM.yyyy')}</time>
        </li>
      {/if}
      {#if article.pdf}
        <li class="-meta-pdf">
          <a href={article.pdf.src} target="_blank" rel="follow" title={article.pdf.name}>{article.pdf.title}</a>
        </li>
      {/if}
    </ul>
    {#if article.image}
      <Picture ex-class="-picture" src={article.image.src} tablet={article.image.srcSmall} alt={article.image.alt} />
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

    {#if article.link}
      <a href={article.link} rel="nofollow" target="_blank">{article.link}</a>
    {/if}
  </article>
{/if}

<style lang="scss" global>
  .XioniArticle {
    @if mixin-exists(XioniArticle-reset) {
      @include XioniArticle-reset;
    } @else {
      display: flow-root;

      .-meta {
        @include reset-list;

        &-author,
        &-date {
          display: inline-block;
        }

        &-pdf {
          display: flex;
          align-items: center;

          svg {
            max-width: 1rem;
            max-height: 1rem;
            margin-right: 0.333rem;
          }
        }
      }

      .-picture {
        max-width: 10rem;
        float: left;
        margin-right: 2rem;
      }

      .-text-picture {
        max-width: 100%;
      }
    }

    @if mixin-exists(XioniArticle) {
      @include XioniArticle;
    }
  }
</style>
