<script>
  let bottles = 0;
  let singleprice = 7;
  let shippingcost = 9;

  $: price = bottles * singleprice;
  $: total = price + shippingcost;

  const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
</script>

<section>
  <p>
    Sie können über dieses Formular direkt den Rheingauer Leichtsinn zum Preis von {formatter.format(singleprice)} pro Flasche
    bestellen.
  </p>

  <Form id="49" subject="Bestellung Leichtsinn">
    <Select
      name="flaschen"
      label="Flaschen"
      options={['6 Flaschen', '12 Flaschen', '18 Flaschen', '24 Flaschen']}
      on:selected={({ detail }) => (bottles = parseInt(detail))}
    />
    <Input name="firstname" label="Vorname" required />
    <Input name="lastname" label="Nachname" />
    <Input name="street" label="Straße" required />
    <Input name="nr" label="Hausnummer" />

    {#if bottles > 0}
      <table>
        <thead>
          <tr>
            <th>Artikel</th>
            <th>Preis</th>
            <th>Anzahl</th>
            <th>Netto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rheingauer Leichtsinn</td>
            <td class="currency">{formatter.format(singleprice)}</td>
            <td class="number">{bottles}</td>
            <td class="currency">{formatter.format(price)}</td>
          </tr>
          <tr>
            <td>Versandkosten</td>
            <td class="currency">{formatter.format(shippingcost)}</td>
            <td class="number">1</td>
            <td class="currency">{formatter.format(shippingcost)}</td>
          </tr>
          <tr>
            <td colspan="4">
              <hr />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="99" class="currency total">{formatter.format(total)}</td>
          </tr>
        </tfoot>
      </table>
    {/if}

    <div>
      <Button>Bestellen</Button>
    </div>
  </Form>
</section>

<style lang="scss">
  section {
    max-width: 480px;
    margin: {
      left: auto;
      right: auto;
    }
  }

  table {
    border: 1px solid lightgray;
    border-radius: 0.25rem;

    th {
      background: #eee;
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
      font-weight: normal;
    }

    th,
    td {
      padding: 0.25rem 0.5rem;
    }
  }

  .currency {
    font-family: 'Courier New', Courier, monospace;
    text-align: right;
  }

  .number {
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
  }

  .total {
    font-weight: bold;
    text-decoration: underline;
    text-decoration-style: double;
  }
</style>
