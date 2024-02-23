<script lang="ts">
	import { format } from '$lib/utils/formatDate.js'
	import { onDestroy } from 'svelte'
	import { order as orderApi, payment as paymentApi } from '../../shopApi.js'
	import { payPalClientId as clientId } from '../../shopConfig.js'
	import messages from '$lib/messages.js'

	import type { XioniShop } from '$lib/boilerplate/xioni/shop/XioniShop.types.js'
	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch.js'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import PayPalButtons from '$lib/boilerplate/components/PayPalButtons/PayPalButtons.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	// -----------------------------------------------------------------------------------------------

	let paypalOrderId: string
	let order = data.order as XioniShop.Order

	$: address = order.address as XioniShop.Order['address']
	$: date = format(order.date as Date, 'PPP')
	$: deliveryAddress = order.deliveryAddress as XioniShop.Order['deliveryAddress']

	async function onApproveHandler() {
		await paymentApi.capturePayPalTransaction(paypalOrderId)
		await orderApi.getOrder(order.transactionId)
	}

	async function createOrderHandler() {
		const [id] = (await paymentApi.createPayPalTransaction(order.transactionId as string)) as [
			string,
			undefined
		]

		return (paypalOrderId = id)
	}

	function errorHandler({ data }: XioniFetchErrorResponse) {
		messages.reset()
		messages.add((data.details || ['Ein Fehler ist aufgetreten.'])?.join('\n'), data.message, {
			type: 'error'
		})
	}

	// prettier-ignore
	orderApi.$event
		.on('error', errorHandler)
		.on('success', data => (order = data))

	// prettier-ignore
	paymentApi.$event
		.on('error', errorHandler)
		.on('success', (_, {emitter}) => {
			if (emitter !== 'capturePayPalTransaction') return

			messages.add('Zahlung abgeschlossen.', 'Pay Pal', {
				type: 'success',
				timeout: 5000
			})
	})

	onDestroy(() => {
		orderApi.$event.removeAllListeners()
		paymentApi.$event.removeAllListeners()
	})
</script>

<svelte:head>
	<title>Bestellung {order.transactionId?.toUpperCase()}</title>
</svelte:head>

<ol>
	{#if address.company}
		<li>{address.company}</li>
	{/if}
	<li>
		{address.salutation}
		{address.firstname}
		{address.name}
	</li>
	<li>{address.address}</li>
	<li>{address.zip} {address.city}</li>
</ol>

<hr />

<Grid>
	<Grid size="1-2">
		<strong class="$font-larger">Ihre Bestellung</strong>
	</Grid>
	<Grid size="1-2" class="$text-right">
		<ul>
			<li>
				Transaktion: <span style="letter-spacing: 1px">{order.transactionId?.toUpperCase()}</span>
			</li>
			<li>Datum: {date}</li>
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
		an folgende Bankverbindung überweisen:
	</p>

	<p>
		Musterfirma GmbH<br />
		IBAN: DE00 0000 0000 0000 0000 00<br />
		Musterbank<br />
		Verwendungszweck: <span style="letter-spacing: 1px">{order.transactionId?.toUpperCase()}</span>
	</p>
{/if}

{#if deliveryAddress}
	<p>Die Waren werden wie gewünscht an folgende Adresse verschickt:</p>
	<ol>
		{#if deliveryAddress.company}
			<li>{deliveryAddress.company}</li>
		{/if}
		<li>{deliveryAddress.name}</li>
		<li>{deliveryAddress.address}</li>
		<li>{deliveryAddress.zip} {deliveryAddress.city}</li>
	</ol>
{/if}

<Button class="$mt-4" icon="fas fa-print" on:click={() => window.print()}>Drucken</Button>

<style>
	li + li {
		margin-top: 0.25rem;
	}
</style>
