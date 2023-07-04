<script lang="ts">
	import MakeShopOrder from '$lib/boilerplate/libraries/xioni-shop/order'
	import { module } from '../../config'
	import { INVOICE_ADDRESS, SHIPPING_ADDRESS, CART } from '../../_stores'
	import { goto } from '$app/navigation'

	const shopOrder = MakeShopOrder(module)

	// --- [ Components ] ----------------------------------------------------------------------------

	import Checkbox from '$lib/boilerplate/components/Checkbox/Checkbox.svelte'
	import Input from '$lib/boilerplate/components/Input/Input.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Select from '$lib/boilerplate/components/Select/Select.svelte'
	import Textarea from '$lib/boilerplate/components/Textarea/Textarea.svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import { ImputPropsType } from '$lib/boilerplate/components/Input/Input.types'
	import Button from '$lib/boilerplate/components/Button/Button.svelte'

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let showDeliveryAddressForm = false
	let invoiceAddress = { ...$INVOICE_ADDRESS }
	let invoiceAddressErrors = {} as { [key: string]: string }
	let shippingAddress = { ...$SHIPPING_ADDRESS }
	let shippingAddressErrors = {} as { [key: string]: string }

	function toggleShippingForm() {
		showDeliveryAddressForm = !showDeliveryAddressForm
	}

	async function validateAddress() {
		const { success, data } = await shopOrder.setAddress(invoiceAddress, 'invoice')

		if (success) {
			INVOICE_ADDRESS.set(invoiceAddress)
			invoiceAddressErrors = {}
			goto('/shop/checkout/summary')
		} else {
			invoiceAddressErrors = data.payload?.address as any
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
	<Grid size="1">
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
			error={invoiceAddressErrors.firstname}
			required />
	</Grid>
	<Grid size="2-5">
		<Input
			bind:value={invoiceAddress.name}
			name="lastname"
			label="Nachname"
			error={invoiceAddressErrors.name}
			required />
	</Grid>
	<Grid size>
		<Input
			bind:value={invoiceAddress.address}
			name="address"
			label="Straße & Hausnummer"
			error={invoiceAddressErrors.address}
			required />
	</Grid>
	<Grid size="1-3">
		<Input
			bind:value={invoiceAddress.zip}
			name="zip"
			label="PLZ"
			error={invoiceAddressErrors.zip}
			required />
	</Grid>
	<Grid size="2-3">
		<Input
			bind:value={invoiceAddress.city}
			name="city"
			label="Ort"
			error={invoiceAddressErrors.city}
			required />
	</Grid>
	<Grid size="1">
		<Input
			type={ImputPropsType.TEL}
			bind:value={invoiceAddress.phone}
			name="phone"
			label="Telefonnummer"
			error={invoiceAddressErrors.phone}
			required />
	</Grid>
	<Grid size="1">
		<Input
			bind:value={invoiceAddress.email}
			error={invoiceAddressErrors.email}
			name="email"
			label="E-Mail-Adresse"
			required />
	</Grid>
	<Grid size="1">
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

{#if Object.keys(shippingAddressErrors).length}
	<Message title="" type="error" class="$font-small $mb">
		<ul>
			{#each Object.values(shippingAddressErrors) as error}
				<li>{error}</li>
			{/each}
		</ul>

		Bitte füllen Sie alle Felder korrekt aus.</Message>
{/if}

<Button on:click={validateAddress}>Weiter zur Zusammenfassung</Button>
