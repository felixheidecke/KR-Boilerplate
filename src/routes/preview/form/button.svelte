<script>
  let code = `
<Button>Button</Button>
<Button disabled>Disabled</Button>
<Button icon="fab fa-apple">Apple</Button>
<Button icon="fab fa-facebook" reverse>Facebook</Button>
`
</script>

<svelte:head>
  <title>Button</title>
</svelte:head>

<div data-page>
  <h2>Button</h2>

  <h3>Code</h3>

  <Code {code} />

  <h3>Ergebnis</h3>

  <Button>Button</Button>
  <Button disabled>Disabled</Button>
  <Button icon="fab fa-apple">Apple</Button>
  <Button icon="fab fa-facebook" reverse>Facebook</Button>
</div>
