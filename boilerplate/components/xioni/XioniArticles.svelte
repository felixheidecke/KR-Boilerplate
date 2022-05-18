<script>
  import { onMount } from 'svelte';
  import { articles, groups, fetchArticles } from '@/stores/articles';

  import { toClass } from '@/js/utils';

  // --- Props --------
  export let id;
  export let limit = 100;
  export let author = false;
  export let date = false;
  export let expanded = false;
  export let detailsPath = '';

  // --- Computed -----
  $: listOfarticles = $articles.filter((a) => a.module == id) || [];

  // --- Lifecycle ----
  onMount(async () => {
    if ($groups.includes(id)) return;

    fetchArticles(id, limit);
  });
</script>

<ul class={toClass(['XioniArticles'], $$props)}>
  {#each listOfarticles as article}
    <li>
      <XioniArticle id={article.id} {date} {author} {expanded} ex-class={!expanded ? '-article' : null} />
      {#if !expanded && article.content.length}
        <Button href={detailsPath + '/' + article.slug} class="-read-more">... weiter lesen</Button>
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
      // Read More button
    }
  }
</style>
