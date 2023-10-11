<script lang="ts">
	import { format } from '$lib/boilerplate/utils/format-date.js'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Button from '$lib/boilerplate/components/Button/Button.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	// -----------------------------------------------------------------------------------------------

	const order = data.order
	const date = format(order.date as Date, 'PPP')
	const address = order.address
</script>

<div>
	<h1 class="h3">Vielen Dank für Ihre Bestellung</h1>

	<Grid>
		<Grid size="1-2">
			<ol>
				{#if address.company}
					<li class="$mb-1/4">{address.company}</li>
				{/if}
				<li class="$mb-1/4">
					<strong>{address.salutation} {address.firstname} {address.name}</strong>
				</li>
				<li>{address.address}</li>
				<li>{address.zip} {address.city}</li>
			</ol>
		</Grid>
		<Grid size="1-2" class="$text-right">
			<ul>
				<li>
					Transaktion: {order.transactionId?.toUpperCase()}
				</li>
				<li>
					Datum: {date}
				</li>
				<li>
					Zahlart: {order.paymentType}
				</li>
			</ul>
		</Grid>
		<Grid size>
			<table class="$w-full">
				<thead>
					<tr>
						<th>Produkt</th>
						<th>Menge</th>
						<th>Preis</th>
						<th>Gesamt</th>
					</tr>
				</thead>
				<tbody>
					{#each order.cart as product}
						<tr>
							<td>{product.name}</td>
							<td class="$text-center">{product.quantity}</td>
							<td class="$text-right">{product.price.formatted}</td>
							<td class="$text-right">{product.total.formatted}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					{#if order.shippingCost}
						<tr>
							<td colspan="3" class="$pt $text-right $font-bold">Versandkosten</td>
							<td class="$pt $text-right">{order.shippingCost.formatted}</td>
						</tr>
					{/if}
					<tr>
						<td colspan="3" class="$pt $text-right $font-bold">Gesamt</td>
						<td class="$pt $text-right">{order.total.formatted}</td>
					</tr>
				</tfoot>
			</table>
		</Grid>
	</Grid>
	<Button icon="fas fa-print" on:click={() => window.print()}>Drucken</Button>
</div>

<style>
	div {
		max-width: 48rem;
		margin: 0 auto;
		padding: 1rem;
	}
</style>
