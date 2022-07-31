<script>
  const assetRoot =
    'https://ssl.webpack.de/wp12578177.server-he.de/kr-boilerplate'

  let html = `
<OpeningHours
  hours="Mo-Fr 09:00-22:00; Sa-Su 08:00-12:00"
  signOpen="/images/we-are-open.png"
  signClosed="/images/we-are-closed.png"
/>`
</script>

<svelte:head>
  <title>Opening Hours | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <OpeningHours
    hours="Mo-Fr 09:00-22:00; Sa-Su 08:00-12:00"
    signOpen={`${assetRoot}/we-are-open.png`}
    signClosed={`${assetRoot}/we-are-closed.png`}
  />
</div>
