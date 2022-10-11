<script>
  let code = `
<ButtonRow>
  <Button icon="fas fa-file-pdf">PDF download</Button>
  <Button icon="fas fa-id-card">Registrierun</Button>
  <Button>Jetzt klicken</Button>
</ButtonRow>
`
</script>

<svelte:head>
  <title>Button Row | Boilerplate</title>
</svelte:head>

<div data-page>
  <h2>Button Row</h2>

  <h3>Code</h3>
  <Code {code} />

  <h3>Ergebnis</h3>
  <ButtonRow>
    <Button icon="fas fa-file-pdf">PDF download</Button>
    <Button icon="fas fa-id-card">Registrierun</Button>
    <Button>Jetzt klicken</Button>
  </ButtonRow>
</div>
