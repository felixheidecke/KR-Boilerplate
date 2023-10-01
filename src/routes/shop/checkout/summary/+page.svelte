<script lang="ts">
	import { goto } from '$app/navigation'
	import { isEmpty } from 'lodash-es'
	import { orderApi } from '../../shop.api'
	import { ORDER, CART } from '../../shop.stores'
	import messages from '$lib/messages'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniFetchError } from '$lib/boilerplate/xioni/utils/xioniFetch'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'

	// -----------------------------------------------------------------------------------------------

	let address = $ORDER.address || {}
	let deliveryAddress = $ORDER.deliveryAddress || undefined

	function createOrder() {
		messages.reset()
		messages.add('Bestellung wird verarbeitet.', 'Bitte warten', { id: 'loading-indicator' })

		orderApi
			.createOrder()
			.then(order => {
				ORDER.set(order)
				goto(`/shop/order/${order.transactionId}/`)
			})
			.catch(({ data: error }) => {
				const { details, message } = error as XioniFetchError
				const errors = details ? Object.values(details) : []

				messages.add(errors?.join('\n'), message, { type: 'error' })
			})
	}
</script>

<h2>Zusammenfassung</h2>

{#if isEmpty($CART.products)}
	<Message title="Ihr Warenkorb ist leer!" type="error">
		<Link to="/shop/">zurück zum Shop</Link>
	</Message>
{:else if isEmpty(address)}
	<Message title="Rechnungs- und Lieferadresse fehlt!" type="error">
		<Link to="/shop/checkout/address/">jetzt Adresse eingeben</Link>
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
			<Link icon="fas fa-pen" to="/shop/checkout/address/">anpassen</Link>
		</Grid>
	</Grid>

	<h2 class="h3 $mt-3">Warenkorb</h2>

	<CartTable
		products={$CART.products}
		shipping={$CART.shipping}
		supplementalCost={$CART.supplementalCost}
		total={$CART.total} />

	<Link icon="fas fa-pen" class="$mt" to="/shop/checkout/">anpassen</Link>

	<div class="$mt-2">
		<Button icon="fas fa-angle-left" to="/shop/">zum Shop</Button>
		<Button
			icon="fas fa-angle-right"
			class="Button--primary $float-right $row-reverse"
			on:click={createOrder}>jetzt kostenpflichtig bestellen</Button>
	</div>
{/if}
