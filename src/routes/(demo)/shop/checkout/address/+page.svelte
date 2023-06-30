<script>
	import { CART } from '../../_stores/cart'
	import { SHIPPING_ADDRESS, INVOICE_ADDRESS } from '../../_stores/address'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Checkbox from '$lib/boilerplate/components/Checkbox/Checkbox.svelte'
	import Input from '$lib/boilerplate/components/Input/Input.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'
	import { goto } from '$app/navigation'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let showDeliveryAddressForm = false
	let invoiceAddress = $INVOICE_ADDRESS.address
	let shippingAddress = $SHIPPING_ADDRESS.address

	function toggleShippingForm() {
		showDeliveryAddressForm = !showDeliveryAddressForm
	}

	async function validateAddress() {
		await INVOICE_ADDRESS.validate(invoiceAddress)

		if ($INVOICE_ADDRESS.isValid) {
			goto('/shop/checkout/summary')
		}
	}
</script>

<h1 class="h2">Kasse</h1>

<p>
	Der Gesamtrechnungsbetrag von <span class="$decoration-double-underline">
		{$CART.total.formatted}
	</span>
	wird per Vorauskasse beglichen.<br />
</p>

<h2 class="h3">Rechnungsanschrift</h2>

<Grid gap>
	<Grid size>
		<Input bind:value={invoiceAddress.company} name="company" label="Firma" />
	</Grid>
	<Grid size="1-5">
		<Select bind:value={invoiceAddress.salutation} options={['Herr', 'Frau']} label="Anrede" />
	</Grid>
	<Grid size="2-5">
		<Input
			bind:value={invoiceAddress.firstname}
			name="firstname"
			label="Vorname"
			error={$INVOICE_ADDRESS.errors.firstname}
			required />
	</Grid>
	<Grid size="2-5">
		<Input
			bind:value={invoiceAddress.name}
			name="lastname"
			label="Nachname"
			error={$INVOICE_ADDRESS.errors.name}
			required />
	</Grid>
	<Grid size>
		<Input
			bind:value={invoiceAddress.address}
			name="address"
			label="Straße & Hausnummer"
			error={$INVOICE_ADDRESS.errors.address}
			required />
	</Grid>
	<Grid size="1-3">
		<Input
			bind:value={invoiceAddress.zip}
			name="zip"
			label="PLZ"
			error={$INVOICE_ADDRESS.errors.zip}
			required />
	</Grid>
	<Grid size="2-3">
		<Input
			bind:value={invoiceAddress.city}
			name="city"
			label="Ort"
			error={$INVOICE_ADDRESS.errors.city}
			required />
	</Grid>
	<Grid size>
		<Input
			type="phone"
			bind:value={invoiceAddress.phone}
			name="phone"
			label="Telefonnummer"
			error={$INVOICE_ADDRESS.errors.phone}
			required />
	</Grid>
	<Grid size>
		<Input
			bind:value={invoiceAddress.email}
			error={$INVOICE_ADDRESS.errors.email}
			name="email"
			label="E-Mail-Adresse"
			required />
	</Grid>
	<Grid size>
		<Textarea bind:value={invoiceAddress.message} rows="2" name="message" label="Nachricht" />
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
			<Input bind:value={shippingAddress.company} label="Firma" />
		</Grid>
		<Grid size>
			<Input bind:value={shippingAddress.name} label="Vor- und Nachname" required />
		</Grid>
		<Grid size>
			<Input bind:value={shippingAddress.address} label="Straße & Hausnummer" required />
		</Grid>
		<Grid size="1-3">
			<Input bind:value={shippingAddress.zip} label="PLZ" required />
		</Grid>
		<Grid size="2-3">
			<Input bind:value={shippingAddress.city} label="Ort" required />
		</Grid>
		<!-- <Grid size>
				<Input bind:value={shipmentPhone} label="Telefonnummer" />
			</Grid> -->
	</Grid>
{/if}

{#if Object.keys($INVOICE_ADDRESS.errors).length}
	<Message title={false} type="error" class="$font-small $mb">
		<ul>
			{#each Object.values($INVOICE_ADDRESS.errors) as error}
				<li>{error}</li>
			{/each}
		</ul>

		Bitte füllen Sie alle Felder korrekt aus.</Message>
{/if}

<Button on:click={validateAddress}>Weiter zur Zusammenfassung</Button>
