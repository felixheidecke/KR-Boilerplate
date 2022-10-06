<script>
  let code = `
<XioniEventList module="1500" registration />

<XioniEventRegistration form-id="4">
  <Input name="Name" label="Vor- & Nachname" required class="$mb" />
  <Textarea name="Anschrift" label="Anschrift" required class="$mb" />

  <div slot="done">
    <p>Vielen Dank für Ihre Anmeldung.</p>
    <p>Sie erhalten Ihre Anmeldebestätigung innerhalb der nächsten 24 Std.</p>
  </div>
</XioniEventRegistration>`
</script>

<svelte:head>
  <title>XioniEventList | Boilerplate</title>
</svelte:head>

<div data-root>
  <h2>Eventliste (Mit Anmeldung)</h2>
  <h3>Code</h3>

  <Code {code} />

  <XioniEventList module="1500" registration />

  <XioniEventRegistration form-id="4,1">
    <Input name="Name" label="Vor- & Nachname" required class="$mb" />
    <Input name="Alter" label="Alter" type="number" required class="$mb" />
    <Textarea name="Anschrift" label="Anschrift" required class="$mb" />

    <div slot="done">
      <p>Vielen Dank für Ihre Anmeldung.</p>
      <p>Sie erhalten Ihre Anmeldebestätigung innerhalb der nächsten 24 Std.</p>
    </div>
  </XioniEventRegistration>
</div>
