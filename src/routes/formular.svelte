<script>
  let foo;
  let agb;
</script>

Foo: {foo}, {agb}

<Form id="4" subject="Betreff des Formulars">
  <Select name="anrede" label="Anrede" options={['Herr', 'Frau', 'Obermotz']} />

  <Input name="name" label="Vor- & Nachname" required />
  <Input name="street" label="Straße & Hausnummer" required />
  <Input name="town" label="PLZ & Ort" required />

  <Checkbox name="agb" label="Ich habe die AGB gelesen und akzeptiere." bind:checked={agb} />

  <Radio name="foo" value="ja" label="Ja" bind:group={foo} checked />
  <Radio name="foo" value="nein" label="Nein" bind:group={foo} />

  <Submit text="Kostenpflichtig bestellen" />

  <div slot="done">
    <h3>Alles prima</h3>
    <p>Vielen Dank für ihre Nachricht</p>
  </div>
</Form>
