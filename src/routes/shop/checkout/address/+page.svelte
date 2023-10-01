<script lang="ts">
	import { ADDRESS, SHIPPING_ADDRESS, CART } from '../../stores'
	import { goto } from '$app/navigation'
	import { Order } from '../../api'
	import { shopPath } from '../../config'

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
	import xioniLoader from '$lib/boilerplate/utils/xioni-loader'
	import { error } from '@sveltejs/kit'

	// --- [ Props ] ---------------------------------------------------------------------------------

	// const module: number = $$props.data.module

	// -----------------------------------------------------------------------------------------------

	// Shipping address
	let shippingAddress = { ...$SHIPPING_ADDRESS }
	let shippingAddressErrors = {} as { [key: string]: string }
	let showShippingAddressForm = false

	// Shipping address
	let address = { ...$ADDRESS } as { [key: string]: string }
	let addressErrors = {} as { [key: string]: string }

	async function validateAddress() {
		const [errors, success] = await Order.setAddress(address, 'invoice')

		if (success) {
			ADDRESS.set(address)
			addressErrors = {}
			goto(shopPath + '/checkout/summary')
		} else if (errors.statusCode === 404) {
			alert('Der Shop ist aktuell nicht verfügbar')
		} else {
			addressErrors = errors.payload?.address || ({} as any)
			console.log({ addressErrors })
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
		<Input bind:value={address.company} name="company" label="Firma" />
	</Grid>
	<Grid size="1-5">
		<Select bind:value={address.salutation} options={['Herr', 'Frau']} label="Anrede" />
	</Grid>
	<Grid size="2-5">
		<Input
			bind:value={address.firstname}
			name="firstname"
			label="Vorname"
			error={addressErrors.firstname}
			required />
	</Grid>
	<Grid size="2-5">
		<Input
			bind:value={address.name}
			name="lastname"
			label="Nachname"
			error={addressErrors.name}
			required />
	</Grid>
	<Grid size>
		<Input
			bind:value={address.address}
			name="address"
			label="Straße & Hausnummer"
			error={addressErrors.address}
			required />
	</Grid>
	<Grid size="1-3">
		<Input bind:value={address.zip} name="zip" label="PLZ" error={addressErrors.zip} required />
	</Grid>
	<Grid size="2-3">
		<Input bind:value={address.city} name="city" label="Ort" error={addressErrors.city} required />
	</Grid>
	<Grid size="1">
		<Input
			type={ImputPropsType.TEL}
			bind:value={address.phone}
			name="phone"
			label="Telefonnummer"
			error={addressErrors.phone}
			required />
	</Grid>
	<Grid size="1">
		<Input
			bind:value={address.email}
			error={addressErrors.email}
			name="email"
			label="E-Mail-Adresse"
			required />
	</Grid>
	<Grid size="1">
		<Textarea bind:value={address.message} rows="2" name="message" label="Nachricht" />
	</Grid>
</Grid>

<Checkbox
	class="$my"
	checked={!showShippingAddressForm}
	on:change={() => (showShippingAddressForm = !showShippingAddressForm)}
	label="Lieferadresse entspricht der Rechnungsadresse" />

{#if showShippingAddressForm}
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
