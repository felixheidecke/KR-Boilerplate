<script>
  const code = '<XioniArticleList author date id="1383" />'
</script>

<svelte:head>
  <title>XioniArticleList | Boilerplate</title>
</svelte:head>

<div data-page>
  <h2 class="title">XioniArticleList</h2>

  <h3>Beispiel Code</h3>

  <Code {code} />

  <p>
    <Link to="https://github.com/felixheidecke/KR-Boilerplate/wiki/Xioni#artikel-liste">
      Zur Dokumentation
    </Link>
  </p>

  <h3>Ergebnis</h3>

  <XioniArticleList author date id="1383" detail-path="/preview/xioni/article/" />
</div>

<style>
  [data-page] :global(.Checkbox) {
    width: fit-content;
  }
</style>
