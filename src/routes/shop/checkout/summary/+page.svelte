<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation'
	import { Order } from '../../api'
	import { ORDER, CART } from '../../stores'
	import { isBoolean, isEmpty } from 'lodash-es'
	import messages from '$lib/messages'

	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading = false

	$: products = $CART.products || {}
	$: address = $ORDER.address || {}
	$: shippingAddress = $ORDER.shippingAddress || null

	function toggleLoading(status?: boolean) {
		const id = 'loading-indicator'
		isLoading = isBoolean(status) ? status : !isLoading

		if (isLoading) {
			messages.add('Bestellung wird verarbeitet.', 'Bitte warten', { id, timeout: 0 })
		} else {
			messages.remove(id)
		}
	}

	function errorHandler(error: XioniFetchErrorResponse) {
		if (error.statusCode !== 412) {
			messages.reset()
			messages.add((error.data.payload || [])?.join('\n'), error.data.message, { type: 'error' })
		}
	}

	async function submitOrder() {
		const [order] = await Order.createOrder()

		if (order) {
			ORDER.set(order)
			goto('/shop/order-confirmation/' + order.transactionId)
		}
	}

	Order.$event.on('loading-toggle', toggleLoading).on('error', errorHandler)

	beforeNavigate(() => Order.$event.removeAllListeners())
</script>

<h2>Zusammenfassung</h2>

{#if isEmpty(products)}
	<Message title="Ihr Warenkorb ist leer!" type="error">
		<Link to="/shop">zurück zum Shop</Link>
	</Message>
{:else if isEmpty(address)}
	<Message title="Rechnungs- und Lieferadresse fehlt!" type="error">
		<Link to="/shop/checkout/address">jetzt Adresse eingeben</Link>
	</Message>
{:else}
	<p>Bitte überprüfen Sie die Daten auf Richtigkeit, bevor Sie die Bestellung abschließen.</p>

	<Grid gap>
		<Grid size="tablet-1-2">
			<h3>Rechnungsadresse</h3>
			{#if address.company}
				{address.company}<br />
			{/if}
			<strong>
				{address.salutation}
				{address.firstname}
				{address.name}
			</strong><br />
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
			{#if shippingAddress}
				{#if shippingAddress.company}
					{shippingAddress.company}<br />
				{/if}
				<strong>{shippingAddress.name}</strong><br />
				{shippingAddress.address}<br />
				{shippingAddress.zip}
				{shippingAddress.city}
			{:else}
				<i>Entspricht Rechnungsadresse</i>
			{/if}
		</Grid>
		<Grid size>
			<Link icon="fas fa-pen" to="./address">anpassen</Link>
		</Grid>
	</Grid>

	<h2 class="h3 $mt-3">Warenkorb</h2>

	<CartTable
		products={$CART.products}
		shippingCost={$CART.shippingCost}
		supplementalCost={$CART.supplementalCost}
		total={$CART.total} />

	<Link icon="fas fa-pen" class="$mt" to="/shop/cart">anpassen</Link>

	<div class="$mt-2">
		<Button icon="fas fa-angle-left" to="/shop">zurück zum Shop</Button>
		<Button
			icon="fas fa-angle-right"
			class="Button--primary $float-right $row-reverse"
			on:click={submitOrder}>jetzt kostenpflichtig bestellen</Button>
	</div>
{/if}
