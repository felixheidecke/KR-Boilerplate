<script>
  let code = `
<Mail to="felix@heidecke.me" /><br />
<Mail to="felix@heidecke.me" icon="fas fa-at" />
`
</script>

<svelte:head>
  <title>Mail | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <Code {code} />

  <h3>Ergebnis</h3>
  <Mail to="felix@heidecke.me" />
  <br />
  <Mail to="felix@heidecke.me" icon="fas fa-at" />
</div>
