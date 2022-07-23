<script>
  let html = `<XioniArticles author date expanded id="1383" />`;
</script>

<svelte:head>
  <title>Swiper | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>

  <CodeHighlighter {html} />

  <XioniArticleList author date id="1383" limit="999" />
</div>
