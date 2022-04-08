<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } });
</script>

<script>
  import { articles, fetchArticle, state } from '@/stores/articles';
  import { format } from 'date-fns';
  import { onMount } from 'svelte';

  // --- Props --------
  export let id;

  // --- Computed -----
  $: article = $articles.find((a) => a.id === parseInt(id)) || {};

  // --- Lifecycle ----
  onMount(async () => {
    if (article.id) return;
    await fetchArticle(id);
    window.scrollTo(0, 0);
  });
</script>

<article class:--is-loading={$state.loading} data-id={id}>
  {#if article.id}
    <header>
      <Aspect ratio="16:9">
        {#if article.image}
          <img class="mood" src={article.image.src} alt="alt" />
        {/if}
      </Aspect>

      <div class="intro">
        <h2 class="title">
          {article.title}
        </h2>
        <ul class="meta">
          {#if article.author}
            <li class="meta-author">Ein Beitrag von {article.author}</li>
          {/if}
          <li class="meta-date">
            Vom <time>{format(article.date, 'dd.MM.yyyy')}</time>
          </li>
        </ul>
      </div>
    </header>
    <div class="wrapper">
      <div class="teaser">
        {@html article.text}
      </div>
      {#if article.content.length}
        <div class="text">
          {#each article.content as content}
            {#if content.image}
              <Picture class="-picture" src={content.image.src} alt={content.image.alt} />
            {/if}
            {#if content.text}
              {@html content.text}
            {/if}
          {/each}
        </div>
      {/if}

      {#if article.pdf}
        <a href={article.pdf.src} class="pdf" target="_blank" title={article.pdf.name}>{article.pdf.title}</a>
      {/if}

      {#if article.link}
        <a href={article.link} class="link" rel="nofollow" target="_blank">{article.link}</a>
      {/if}
    </div>
  {/if}
</article>

<style lang="scss">
  article {
    background: #fff;
    max-width: 60rem;
    box-shadow: 0 0 1rem lightgray;
    margin: {
      left: auto;
      right: auto;
    }

    header {
      position: relative;
      background-color: lightblue;
    }

    .mood {
      object-fit: cover;
    }

    .intro {
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(black, 0.666);
      color: white;
      padding: 1.5rem;
      max-width: 66%;
      transform: translate(1.5rem, -1.5rem);
    }

    .title {
      @include reset;
      margin-bottom: 1rem;
    }

    .meta {
      font-style: italic;
    }

    .meta-date {
      margin-top: 0.5rem;
    }

    :global {
      .-picture {
        display: flex;
        justify-content: center;

        img {
          margin: 2rem 0;
          max-width: 46rem;
          box-shadow: 0 0 1rem lightgray;
          border: 0.5rem solid white;
        }
      }
    }

    .teaser {
      border-bottom: 1px solid lightgray;
      margin-bottom: 2rem;

      :global(p) {
        font-size: 1.25rem;
        line-height: 2rem;
        font-weight: bold;
      }
    }

    .wrapper {
      padding: 2rem 3rem;
    }
  }
</style>
