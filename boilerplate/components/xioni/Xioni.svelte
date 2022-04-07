<script>
  export let article = false;
  export let list = false;

  export let author = false;
  export let date = false;
</script>

{#if article}
  <XioniArticle id={article} {author} {date} />
{:else if list}
  <XioniTeaser id={list} {author} {date} />
{/if}
