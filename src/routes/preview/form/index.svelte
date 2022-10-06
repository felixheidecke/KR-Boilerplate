<script>
  let code = `
<Form id="4" subject="Neue Nachticht">
  <Input name="name" label="Vor- und Nachname" class="$mb" required />

  <Textarea name="message" label="Meine Nachricht" class="$mb" required />

  <Submit class="$mt-2" />

  <div slot="done">
    <h3>Vielen Dank</h3>
    <p>... für deine Nachricht</p>
  </div>
</Form>`
</script>

<svelte:head>
  <title>Form | Boilerplate</title>
</svelte:head>

<h2>Form</h2>

<h3>Code</h3>

<Code {code} />

<h3>Ergebnis</h3>

<Form id="4" subject="Neue Nachticht">
  <Input name="name" label="Vor- und Nachname" class="$mb" required />

  <Textarea name="message" label="Meine Nachricht" class="$mb" required />

  <Submit class="$mt-2" />

  <div slot="done">
    <h3>Vielen Dank</h3>
    <p>... für deine Nachricht</p>
  </div>
</Form>
