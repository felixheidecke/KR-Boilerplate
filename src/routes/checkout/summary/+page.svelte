<script lang="ts">
	import { goto } from '$app/navigation'
	import { isEmpty } from 'lodash-es'
	import { ORDER, CART } from '$lib/stores'
	import { useOrder } from '$lib/boilerplate/xioni/shop/Order'
	import type { XioniShop } from '$lib/boilerplate/xioni/types'
	import messages from '$lib/messages'

	// --- [ Components ] ----------------------------------------------------------------------------

	import { Button, Grid, Link, Message, XioniShopCartTable } from '$lib/boilerplate/components'

	// -----------------------------------------------------------------------------------------------

	let address = $ORDER.address || {}
	let deliveryAddress = $ORDER.deliveryAddress || undefined

	function createOrder() {
		messages.reset()
		messages.add('Bestellung wird verarbeitet.', 'Bitte warten', { id: 'loading-indicator' })

		useOrder()
			.createOrder()
			.then(transactionId => {
				ORDER.set({
					address: {},
					total: {},
					shippingCost: {}
				} as XioniShop.Order)
				goto(`/order/${transactionId}/`)
			})
			.catch(({ data: error }) => {
				const { details, message } = error as any
				const errors = details ? Object.values(details) : []

				messages.add(errors?.join('\n'), message, { type: 'error' })
			})
	}
</script>

<h2>Zusammenfassung</h2>

{#if isEmpty($CART.products)}
	<Message title="Ihr Warenkorb ist leer!" type="error">
		<Link to="/">zurück zum Shop</Link>
	</Message>
{:else if isEmpty(address)}
	<Message title="Rechnungs- und Lieferadresse fehlt!" type="error">
		<Link to="/checkout/address/">jetzt Adresse eingeben</Link>
	</Message>
{:else}
	<p>Bitte überprüfen Sie die Daten auf Richtigkeit bevor Sie die Bestellung abschließen.</p>

	<Grid gap>
		<Grid size="tablet-1-2">
			<h3>Rechnungsadresse</h3>
			{#if address.company}
				{address.company}<br />
			{/if}

			{address.salutation}
			{address.firstname}
			{address.name}
			<br />
			{address.address}<br />
			{address.zip}
			{address.city}<br />
			{#if address.phone}
				Telefon: {address.phone}<br />
			{/if}
			E-Mail: {address.email}
		</Grid>
		<Grid size="tablet-1-2">
			<h3>Lieferadresse</h3>
			{#if deliveryAddress}
				{#if deliveryAddress.company}
					{deliveryAddress.company}<br />
				{/if}
				{deliveryAddress.name}<br />
				{deliveryAddress.address}<br />
				{deliveryAddress.zip}
				{deliveryAddress.city}
			{:else}
				<i>Entspricht Rechnungsadresse</i>
			{/if}
		</Grid>
		{#if $ORDER.message}
			<Grid size>
				<h4>Ihre Nachricht</h4>
				<p>{$ORDER.message}</p>
			</Grid>
		{/if}
		<Grid size>
			<Button fontello="angle-right" class="$row-reverse" to="/checkout/address/">anpassen</Button>
		</Grid>
	</Grid>

	<h2 class="h3 $mt-3">Warenkorb</h2>

	<XioniShopCartTable
		products={$CART.products}
		shipping={$CART.shipping}
		supplementalCost={$CART.supplementalCost}
		total={$CART.total} />

	<Button fontello="angle-right" class="$row-reverse $mt" to="/checkout/">anpassen</Button>

	<p><strong>Zahlungsoptionen:</strong> Per PayPal oder im Voraus.</p>

	<div class="$mt-2">
		<Button fontello="angle-left" to="/">zum Shop</Button>
		<Button
			fontello="angle-right"
			class="Button--primary $float-right $row-reverse"
			onClick={createOrder}>jetzt kostenpflichtig bestellen</Button>
	</div>
{/if}
