<script>
  export let name;
  export let amountOfBottles;
  export let shippingcost;
  export let singleprice;
  export let street;
  export let total;
  export let town;

  export let formatter;

  // Computed ---------

  $: price = amountOfBottles * singleprice;
  $: total = price + shippingcost;
</script>

<table>
  <tr>
    <td colspan="4" style="padding:1rem">
      <strong>Adresse</strong>
      <span class:muted={!name}>
        {#if name} {name} {:else} Vor- & Nachname {/if}
      </span><br />
      <span class:muted={!street}>
        {#if street} {street} {:else} Straße & Hausnummer {/if}
      </span><br />
      <span class:muted={!town}>
        {#if town} {town} {:else} PLZ & Ort {/if}
      </span>
    </td>
  </tr>
  <tr>
    <th>Artikel</th>
    <th>Preis</th>
    <th>Anzahl</th>
    <th>Netto</th>
  </tr>
  <tr>
    <td>Rheingauer Leichtsinn</td>
    <td class="currency">{formatter.format(singleprice)}</td>
    <td class="number">{amountOfBottles}</td>
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
  <tfoot>
    <tr>
      <td colspan="3">Gesamt:</td>
      <td class="currency total">{formatter.format(total)}</td>
    </tr>
  </tfoot>
</table>

<style>
  table {
    border: 1px solid lightgray;
    border-radius: 0.25rem;
  }

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

  strong {
    display: block;
    margin-bottom: 0.5rem;
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

  .muted {
    color: lightgray;
  }
</style>
