<script>
  import { format } from 'date-fns';
  import { onMount } from 'svelte';
  import { articles, groups, fetchArticles } from '../store';

  // --- Props --------
  export let id;
  export let author = false;
  export let date = false;

  // --- Computed -----
  $: teasers = $articles.filter((a) => a.module == id) || [];

  // --- Lifecycle ----
  onMount(async () => {
    if ($groups.includes(id)) return;

    fetchArticles(id);
  });
</script>

{#each teasers as teaser}
  <article class="XioniTeaser" data-id={teaser.id}>
    <h2 class="-title">
      {teaser.title}
    </h2>
    {#if teaser.image}
      <Picture ex-class="-picture" src={teaser.image.src} tablet={teaser.image.srcSmall} alt={teaser.image.alt} />
    {/if}
    <div class="-meta">
      {#if author && teaser.author}
        <span class="-meta-author">{teaser.author}</span>
      {/if}
      {#if date && teaser.date}
        <time class="-meta-date">{format(teaser.date * 1000, 'dd.MM.yyyy')}</time>
      {/if}
    </div>
    <div class="-teaser">
      {@html teaser.text}
    </div>
    <a href={teaser.slug} class="-read-more">... weiter lesen</a>
  </article>
{/each}

<style lang="scss" global>
  .XioniTeaser {
    @if mixin-exists(XioniTeaser-reset) {
      @include XioniTeaser-reset;
    } @else {
      display: flow-root;

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

      .-picture {
        max-width: 10rem;
        float: left;
        margin-right: 2rem;
      }

      .-read-more {
        border: 1px solid lightgray;
        padding: 0.25rem 0.5rem;
        font-size: 0.85rem;
        cursor: pointer;
      }
    }

    @if mixin-exists(XioniTeaser) {
      @include XioniTeaser;
    }
  }
</style>
