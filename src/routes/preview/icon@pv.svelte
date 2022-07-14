<script>
  let html = `
<Icon name="fab fa-apple" />
<Icon name="fab fa-apple" size="2" />
<Icon name="fab fa-apple" size="3" />
`;
</script>

<svelte:head>
  <title>Aspect.svelte</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <Icon name="fab fa-apple" />
  <Icon name="fas fa-carrot" size="2" />
  <Icon name="fas fa-burn" size="3" />
</div>
