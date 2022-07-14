<script>
  let html = `
<p>Hier geht's zu <Link to="http://klickrhein.de">meiner Website</Link></p>
<p>Zum Admin-Panel: <Link to="http://klickrhein.de/admin?ref=test-123" icon="fas fa-link"/></p>
`;
</script>

<svelte:head>
  <title>Aspect.svelte</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <p>Hier geht's zu <Link to="http://klickrhein.de">meiner Website</Link></p>
  <p>
    Zum Admin-Panel: <Link
      to="http://klickrhein.de/admin?ref=test-123"
      icon="fas fa-link"
    />
  </p>
</div>
