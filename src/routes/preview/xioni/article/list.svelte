<script>
  const toggle = {
    author: true,
    date: true,
    expanded: false
  }

  $: code = (() => {
    const code = ['<XioniArticleList', 'id="1383"']

    if (toggle.author) code.push('author')
    if (toggle.date) code.push('date')
    if (toggle.expanded) code.push('expanded')

    code.push('\\>')

    return code.join(' ')
  })()
</script>

<svelte:head>
  <title>XioniArticleList | Boilerplate</title>
</svelte:head>

<div data-page>
  <h2 class="title">XioniArticleList</h2>

  <h3>Beispiel Code</h3>

  <Code {code} />

  <h3>Varianten</h3>

  <Checkbox label="Mit Author" bind:checked={toggle.author} />
  <Checkbox label="Mit Datum" class="$mt-1/2" bind:checked={toggle.date} />
  <Checkbox label="Ausgeklappt" class="$mt-1/2" bind:checked={toggle.expanded} />

  <h3>Ergebnis</h3>

  <XioniArticleList
    config={{ limit: 5 }}
    author={toggle.author}
    date={toggle.date}
    expanded={toggle.expanded}
    id="1383"
    detail-path="/preview/xioni/article/"
  />
</div>

<style>
  [data-page] :global(.Checkbox) {
    width: fit-content;
  }
</style>
