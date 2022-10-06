<script>
  let code = `
<Icon name="fab fa-apple" />
<Icon name="fab fa-apple" size="2" />
<Icon name="fab fa-apple" size="3" />
`
</script>

<svelte:head>
  <title>Icon | Boilerplate</title>
</svelte:head>

<div data-page>
  <h2>Icon</h2>
  <h3>Code</h3>
  <Code {code} />

  <h3>Ergebnis</h3>
  <Icon name="fab fa-apple" />
  <Icon name="fas fa-carrot" size="2" />
  <Icon name="fas fa-burn" size="3" />
</div>
