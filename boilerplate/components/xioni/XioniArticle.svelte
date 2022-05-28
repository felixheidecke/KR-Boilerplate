<script>
  import { classNameHelper } from '@/js/utils';
  import { format } from 'date-fns';
  import { onMount } from 'svelte';
  import { articles, fetchArticle, state } from '@/stores/articles';

  // --- Props --------
  export let author = false;
  export let date = false;
  export let expanded = true;
  export let id;

  // --- Computed -----
  $: article = $articles.find((a) => a.id === parseInt(id)) || {};

  // --- Lifecycle ----
  onMount(async () => {
    if (article.id) return;
    await fetchArticle(id);

    // Defer to end of callstack
    // setTimeout(() => window.scrollTo(0, 0));
  });
</script>

<article class={classNameHelper(['XioniArticle'], $$props)} id={`article-${id}`}>
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

    {#if expanded}
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
{:else}
  <XioniSceleton />
{/if}

<style lang="scss" global>
  :where(.XioniArticle) {
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

    .-text ul {
      list-style-type: disc;
      padding-left: 2rem;
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
</style>
