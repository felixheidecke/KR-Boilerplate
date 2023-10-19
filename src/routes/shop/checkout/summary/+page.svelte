<script lang="ts">
	import { goto } from '$app/navigation'
	import { Order } from '../../api'
	import { ORDER, CART } from '../../stores'
	import { isEmpty } from 'lodash-es'
	import { onDestroy, onMount } from 'svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'

	// -----------------------------------------------------------------------------------------------

	let showRedirectInfo = false
	$: products = $CART.products || {}
	$: address = $ORDER.address || {}
	$: shippingAddress = $ORDER.shippingAddress || null

	function handleErrors(errors: any) {
		console.log(errors)
	}

	function handleCreated({ transactionId }: XioniShop.Order) {
		showRedirectInfo = true
		setTimeout(() => {
			goto('/shop/order-confirmation/' + transactionId)
		}, 1500)
	}

	onMount(() => {
		// prettier-ignore
		Order.$event
			.on('errors', handleErrors)
			.on('created', handleCreated)
	})

	onDestroy(() => {
		// prettier-ignore
		Order.$event
			.off('errors', handleErrors)
			.off('created', handleCreated)
	})
</script>

<h2>Zusammenfassung</h2>

{#if showRedirectInfo}
	<Message title="Bitte warten" type="success">Sie werden in Kürze weitergeleitet.</Message>
{:else if isEmpty(products)}
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
			<h3>Versandadresse</h3>
			{#if shippingAddress}
				{#if shippingAddress.company}
					{shippingAddress.company}<br />
				{/if}
				<strong>{shippingAddress.name}</strong><br />
				{shippingAddress.address}<br />
				{shippingAddress.zip}
				{shippingAddress.city}
			{:else}
				<i>Entsprich Rechnungsadresse</i>
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
		<Button icon="fas fa-angle-left" to="/shop">Zurück zum Shop</Button>
		<Button
			icon="fas fa-angle-right"
			class="Button--primary $float-right $row-reverse"
			on:click={Order.createOrder}>Jetzt kostenpflichtig bestellen</Button>
	</div>
{/if}
