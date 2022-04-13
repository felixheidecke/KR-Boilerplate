<script>
  import { random } from 'lodash-es';
  import { format } from 'date-fns';
  import { onMount } from 'svelte';
  import { articles, groups, fetchArticles } from '@/stores/articles';

  // --- Props --------
  export let id;
  export let max = 25;
  export let author = false;
  export let date = false;
  export let detailsPath = '';

  // --- Computed -----
  $: teasers = $articles.filter((a) => a.module == id) || [];

  // --- Lifecycle ----
  onMount(async () => {
    if ($groups.includes(id)) return;

    fetchArticles(id, max);
  });
</script>

{#each teasers as teaser}
  <article class="XioniTeaser" data-id={teaser.id}>
    <h2 class="-title">
      {teaser.title}
    </h2>
    {#if teaser.image}
      <Picture ex-class="-picture" src={teaser.image.srcSmall} tablet={teaser.image.src} alt={teaser.image.alt} />
    {/if}
    <div class="-meta">
      {#if author && teaser.author}
        <span class="-meta-author">{teaser.author}</span>
      {/if}
      {#if date && teaser.date}
        <time class="-meta-date">{format(teaser.date, 'dd.MM.yyyy')}</time>
      {/if}
    </div>
    <div class="-teaser">
      {@html teaser.text}
    </div>
    <a href={detailsPath + '/' + teaser.slug} class="-read-more">... weiter lesen</a>
  </article>
{:else}
  <XioniSceleton />
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
