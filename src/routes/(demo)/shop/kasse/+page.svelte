<script>
	import { CART, INVOICE_ADDRESS, SHIPPING_ADDRESS } from '../stores'
	import { goto } from '$app/navigation'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Checkbox from '$lib/boilerplate/components/Checkbox/Checkbox.svelte'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let showDeliveryAddressForm = false

	function toggleShippingForm() {
		showDeliveryAddressForm = !showDeliveryAddressForm
		$SHIPPING_ADDRESS = {}
	}

	$: ({ total } = $CART)

	// Go back to home if there are
	// no products in the cart.
	CART.subscribe(({ products }) => {
		if (products?.length) return

		goto('/shop')
	})
</script>

<h1 class="h2">Kasse</h1>

<p>
	Der Gesamtrechnungsbetrag von <span class="$decoration-double-underline">{total?.formatted}</span>
	wird per Vorauskasse beglichen.<br />
</p>

<h2 class="h3">Rechnungsanschrift</h2>

<Grid gap>
	<Grid size>
		<Input bind:value={$INVOICE_ADDRESS.company} label="Firma" />
	</Grid>
	<Grid size="1-5">
		<Select bind:value={$INVOICE_ADDRESS.salutation} options={['Herr', 'Frau']} label="Anrede" />
	</Grid>
	<Grid size="2-5">
		<Input bind:value={$INVOICE_ADDRESS.firstname} label="Vorname" required />
	</Grid>
	<Grid size="2-5">
		<Input bind:value={$INVOICE_ADDRESS.name} label="Nachname" required />
	</Grid>
	<Grid size>
		<Input bind:value={$INVOICE_ADDRESS.address} label="Straße & Hausnummer" required />
	</Grid>
	<Grid size="1-3">
		<Input bind:value={$INVOICE_ADDRESS.zip} label="PLZ" required />
	</Grid>
	<Grid size="2-3">
		<Input bind:value={$INVOICE_ADDRESS.city} label="Ort" required />
	</Grid>
	<Grid size>
		<Input bind:value={$INVOICE_ADDRESS.phone} label="Telefonnummer" required />
	</Grid>
	<Grid size>
		<Input bind:value={$INVOICE_ADDRESS.email} label="E-Mail-Adresse" required />
	</Grid>
	<Grid size>
		<Textarea bind:value={$INVOICE_ADDRESS.message} rows="2" label="Nachricht" />
	</Grid>
</Grid>

<Checkbox
	class="$my"
	checked={!showDeliveryAddressForm}
	on:change={toggleShippingForm}
	label="Lieferadresse entspricht der Rechnungsadresse" />

{#if showDeliveryAddressForm}
	<h2 class="h3">Lieferadresse</h2>

	<Grid gap>
		<Grid size>
			<Input bind:value={$SHIPPING_ADDRESS.company} label="Firma" />
		</Grid>
		<Grid size>
			<Input bind:value={$SHIPPING_ADDRESS.name} label="Vor- und Nachname" required />
		</Grid>
		<Grid size>
			<Input bind:value={$SHIPPING_ADDRESS.address} label="Straße & Hausnummer" required />
		</Grid>
		<Grid size="1-3">
			<Input bind:value={$SHIPPING_ADDRESS.zip} label="PLZ" required />
		</Grid>
		<Grid size="2-3">
			<Input bind:value={$SHIPPING_ADDRESS.city} label="Ort" required />
		</Grid>
		<!-- <Grid size>
				<Input bind:value={shipmentPhone} label="Telefonnummer" />
			</Grid> -->
	</Grid>
{/if}

<Button to="/shop/bestellen">Weiter</Button>
