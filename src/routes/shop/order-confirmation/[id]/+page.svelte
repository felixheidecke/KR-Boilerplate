<script lang="ts">
	import messages from '$lib/messages.js'
	import { format } from '$lib/boilerplate/utils/formatDate.js'
	import { Order } from '../../api.js'
	import { ORDER } from '../../stores.js'
	import { payPalClientId as clientId } from '../../config.js'
	import { onDestroy, onMount } from 'svelte'

	import type { XioniShop } from '$lib/boilerplate/xioni/shop-api/types.js'
	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch.js'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import PayPalButtons from '$lib/boilerplate/components/PayPalButtons/PayPalButtons.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	// -----------------------------------------------------------------------------------------------

	let orderId: string

	const order = data.order as XioniShop.Order
	const address = order.address as XioniShop.Order['address']
	const date = format(order.date as Date, 'PPP')
	const shippingAddress = order.shippingAddress as XioniShop.Order['shippingAddress']

	async function onApproveHandler() {
		await Order.capturePaypalOrder(orderId)
		await Order.getOrder(order.transactionId)
	}

	async function createOrderHandler() {
		const [id] = (await Order.createPayPalOrder(order.transactionId as string)) as [
			string,
			undefined
		]

		return (orderId = id)
	}

	function successHandler(data: any, { emitter }: { emitter: string }) {
		switch (emitter) {
			case 'getOrder':
				ORDER.set(data)
			case 'capturePaypalOrder':
				messages.add('Zahlung abgeschlossen.', undefined, { type: 'success', timeout: 5000 })
		}
	}

	function errorHandler({ data }: XioniFetchErrorResponse) {
		messages.reset()
		messages.add((data.payload || [])?.join('\n'), data.message)
	}

	onMount(function () {
		// prettier-ignore
		Order.$event
			.on('success', successHandler)
			.on('error', errorHandler)
	})

	onDestroy(function () {
		// prettier-ignore
		Order.$event
			.off('success', successHandler)
			.off('error', errorHandler)
	})
</script>

<svelte:head>
	<title>Rechnung {order.transactionId?.toUpperCase()}</title>
</svelte:head>

<ol class="$mt-4">
	{#if address.company}
		<li>{address.company}</li>
	{/if}
	<li>
		<strong>{address.salutation} {address.firstname} {address.name}</strong>
	</li>
	<li>{address.address}</li>
	<li>{address.zip} {address.city}</li>
</ol>

<hr />

<Grid>
	<Grid size="1-2">
		<strong class="$font-larger">Rechnung</strong>
	</Grid>
	<Grid size="1-2" class="$text-right">
		<ul>
			<li>Transaktion: <code>{order.transactionId?.toUpperCase()}</code></li>
			<li>Datum: {date}</li>
			<li>Zahlart: {order.paymentType}</li>
		</ul>
	</Grid>
	<Grid size class="$mt-2">
		<table>
			<thead>
				<tr>
					<th class="$text-left">Produkt</th>
					<th>Menge</th>
					<th class="$text-right">Preis</th>
					<th class="$text-right">Gesamt</th>
				</tr>
			</thead>
			<tbody>
				{#each order.cart as product}
					<tr>
						<td>{product.name}</td>
						<td width="1%" class="$text-center">{product.quantity}</td>
						<td width="1%" class="$text-right">{product.price.formatted}</td>
						<td width="1%" class="$text-right">{product.total.formatted}</td>
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
					<td class="$pt $text-right $font-bold">{order.total.formatted}</td>
				</tr>
			</tfoot>
		</table>
	</Grid>
</Grid>

<p class="$mt-3">Vielen Dank für Ihren Auftrag.</p>

{#if order.paymentType !== 'Paypal'}
	<p class="$font-bold">Bezahlen Sie jetzt per PayPal:</p>

	<PayPalButtons {clientId} {createOrderHandler} {onApproveHandler} />

	<p>
		Alternativ können Sie den Gesamtbetrag von {order.total.formatted} innerhalb von 14 Tagen ab Rechnungsdatum
		an folgende genannte Bankverbindung überweisen:
	</p>

	<p>
		Name des Kontoinhaber<br />
		DE 70 5500 0000 1234 5678 00<br />
		Verwendungszweck: <code>{order.transactionId?.toUpperCase()}</code>
	</p>
{/if}

{#if shippingAddress}
	<p>Nach vollständiger Zahlung wird die Waren wie gewünscht an nachfolgende Adresse verschickt:</p>
	<ol>
		{#if shippingAddress.company}
			<li>{shippingAddress.company}</li>
		{/if}
		<li>
			<strong>{shippingAddress.name}</strong>
		</li>
		<li>{shippingAddress.address}</li>
		<li>{shippingAddress.zip} {shippingAddress.city}</li>
	</ol>
{:else}
	<p>Nach vollständiger Zahlung wird die Waren an oben genannte Adresse verschickt.</p>
{/if}

<p>
	Mit freundlichen Grüßen,<br />
	Max Mustermann
</p>

<Button class="$mt-4" icon="fas fa-print" on:click={() => window.print()}>Drucken</Button>

<style>
	li + li {
		margin-top: 0.25rem;
	}
</style>
