<script>
  let amountOfBottles;
  let shippingcost = 9;
  let singleprice = 7;

  // Form -------------

  let name;
  let street;
  let town;

  // Methods ----------

  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  // Invoice ----------

  $: invoiceProps = {
    name,
    street,
    town,
    singleprice,
    amountOfBottles,
    shippingcost,
    formatter
  };
</script>

<section>
  <p>
    Sie können über dieses Formular direkt den Rheingauer Leichtsinn zum Preis von {formatter.format(singleprice)} pro Flasche
    bestellen.
  </p>

  <Form id="4" subject="Bestellung Leichtsinn">
    <Select
      name="flaschen"
      label="Flaschen"
      values={[6, 12, 18]}
      options={['Eine Box (6 Flaschen)', 'Zwei Boxen (12 Flaschen)', 'Drei Boxen (18 Flaschen)']}
      bind:value={amountOfBottles}
    />

    <hr />

    <Input bind:value={name} name="name" label="Vor- & Nachname" required />
    <Input bind:value={street} name="street" label="Straße & Hausnummer" required />
    <Input bind:value={town} name="town" label="PLZ & Ort" required />

    <hr />

    {#if amountOfBottles > 0}
      <Invoice {...invoiceProps} />
    {/if}

    <div slot="done">Vielen Dank für alles :-*</div>

    <Submit text="Kostenpflichtig bestellen" />
  </Form>
</section>

<style>
  section {
    max-width: 30rem;
    margin: 0 auto;
  }

  hr {
    border: 0 none;
    height: 1px;
    background-color: lightgray;
    width: 100%;
    margin: 0.5rem 0;
  }
</style>
