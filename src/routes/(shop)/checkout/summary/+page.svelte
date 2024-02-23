<script lang="ts">
	import { CART, ORDER } from '../../shopApi'
	import { goto } from '$app/navigation'
	import { isEmpty } from 'lodash-es'
	import { onDestroy } from 'svelte'
	import messages from '$lib/messages'

	import type { XioniShop } from '$lib/boilerplate/xioni/shop/XioniShop.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import CartTable from '$lib/boilerplate/components/XioniShopCartTable/XioniShopCartTable.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'

	// -----------------------------------------------------------------------------------------------

	let address = {} as XioniShop.Order['address']
	let deliveryAddress = undefined as XioniShop.Order['deliveryAddress']

	const unsubscribe = ORDER.subscribe(order => {
		address = order.data.address
		deliveryAddress = order.data.deliveryAddress

		if (order.isLoading) {
			messages.add('Bestellung wird verarbeitet.', 'Bitte warten', { id: 'loading-indicator' })
		} else {
			messages.remove('loading-indicator')
		}

		if (order.errors && order.errors?.statusCode !== 412) {
			messages.reset()
			messages.add((order.errors?.data.details || [])?.join('\n'), order.errors?.data.message, {
				type: 'error'
			})
		}
	})

	async function createOrder() {
		const [_, error] = await ORDER.create()

		if (!error) {
			goto('/bestellung/' + $ORDER.data.transactionId)
		}
	}

	onDestroy(unsubscribe)
</script>

<h2>Zusammenfassung</h2>

{#if isEmpty($CART.data.products)}
	<Message title="Ihr Warenkorb ist leer!" type="error">
		<Link to="/shop">zurück zum Shop</Link>
	</Message>
{:else if isEmpty(address)}
	<Message title="Rechnungs- und Lieferadresse fehlt!" type="error">
		<Link to="/checkout/address">jetzt Adresse eingeben</Link>
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
		<Grid size>
			<Link icon="fas fa-pen" to="./address">anpassen</Link>
		</Grid>
	</Grid>

	<h2 class="h3 $mt-3">Warenkorb</h2>

	<CartTable
		products={$CART.data.products}
		shipping={$CART.data.shipping}
		supplementalCost={$CART.data.supplementalCost}
		total={$CART.data.total} />

	<Link icon="fas fa-pen" class="$mt" to="/warenkorb">anpassen</Link>

	<div class="$mt-2">
		<Button icon="fas fa-angle-left" to="/shop">zurück zum Shop</Button>
		<Button
			icon="fas fa-angle-right"
			class="Button--primary $float-right $row-reverse"
			on:click={createOrder}>jetzt kostenpflichtig bestellen</Button>
	</div>
{/if}
