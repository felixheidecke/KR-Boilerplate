<script lang="ts">
	import { ORDER, CART } from '../../stores'
	import { goto } from '$app/navigation'
	import { shopPath } from '../../config'
	import { Order } from '../../api'
	import { onDestroy, onMount } from 'svelte'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Checkbox from '$lib/boilerplate/components/Checkbox/Checkbox.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Input from '$lib/boilerplate/components/Input/Input.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'
	import Select from '$lib/boilerplate/components/Select/Select.svelte'
	import Textarea from '$lib/boilerplate/components/Textarea/Textarea.svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import { ImputPropsType } from '$lib/boilerplate/components/Input/Input.types'
	import type { XioniFetchErrorResponse } from '$lib/boilerplate/libraries/xioni-fetch/types'

	// -----------------------------------------------------------------------------------------------

	let showShippingAddressForm = false
	let formErrors = new Map()

	// Form bindings
	let address = { ...($ORDER.address || null) }
	let message = ''

	function handleErrors(errors: XioniFetchErrorResponse) {
		formErrors = new Map(errors.data.payload)
	}

	function handleUpdated() {
		goto(shopPath + '/checkout/summary')
	}

	function updateCart() {
		if (!showShippingAddressForm) {
			populateShippingAddress
		}

		Order.updateOrder({ address, message })
	}

	function populateShippingAddress() {
		address.shipmentCompany = address.company
		address.shipmentName = `${address.firstname} ${address.name}`
		address.shipmentZip = address.zip
		address.shipmentAddress = address.address
		address.shipmentCity = address.city
		address.shipmentPhone = address.phone
	}

	onMount(() => {
		// prettier-ignore
		Order.$event
			.on('error', handleErrors)
			.on('updated', handleUpdated)
	})

	onDestroy(() => {
		// prettier-ignore
		Order.$event
			.off('error', handleErrors)
			.off('updated', handleUpdated)
	})
</script>

<h1 class="h2">Kasse</h1>

<p>
	Der Gesamtrechnungsbetrag von <span class="$decoration-double-underline">
		{$CART.total?.formatted}
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
			error={formErrors.get('firstname')}
			required />
	</Grid>
	<Grid size="2-5">
		<Input
			bind:value={address.name}
			name="lastname"
			label="Nachname"
			error={formErrors.get('name')}
			required />
	</Grid>
	<Grid size>
		<Input
			bind:value={address.address}
			name="address"
			label="Straße & Hausnummer"
			error={formErrors.get('address')}
			required />
	</Grid>
	<Grid size="1-3">
		<Input bind:value={address.zip} name="zip" label="PLZ" error={formErrors.get('zip')} required />
	</Grid>
	<Grid size="2-3">
		<Input
			bind:value={address.city}
			name="city"
			label="Ort"
			error={formErrors.get('city')}
			required />
	</Grid>
	<Grid size="1">
		<Input
			type={ImputPropsType.TEL}
			bind:value={address.phone}
			name="phone"
			label="Telefonnummer"
			error={formErrors.get('phone')}
			required />
	</Grid>
	<Grid size="1">
		<Input
			bind:value={address.email}
			error={formErrors.get('email')}
			name="email"
			label="E-Mail-Adresse"
			required />
	</Grid>
	<Grid size="1">
		<Textarea bind:value={message} rows="2" name="message" label="Nachricht" />
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
			<Input bind:value={address.shipmentCompany} label="Firma" />
		</Grid>
		<Grid size>
			<Input bind:value={address.shipmentName} label="Vor- und Nachname" required />
		</Grid>
		<Grid size>
			<Input bind:value={address.shipmentAddress} label="Straße & Hausnummer" required />
		</Grid>
		<Grid size="1-3">
			<Input bind:value={address.shipmentZip} label="PLZ" required />
		</Grid>
		<Grid size="2-3">
			<Input bind:value={address.shipmentCity} label="Ort" required />
		</Grid>
	</Grid>
{/if}

{#if formErrors.size}
	<Message title="" type="error" class="$font-small $mb">
		<ul>
			{#each formErrors as [_, error]}
				<li>{error}</li>
			{/each}
		</ul>

		Bitte füllen Sie alle Felder korrekt aus.</Message>
{/if}

<div class="$mt-2">
	<Button icon="fas fa-angle-left" class="$mt-2" to="/shop">Zurück zum Shop</Button>
	<Button
		icon="fas fa-angle-right"
		class="Button--primary $float-right $row-reverse"
		on:click={updateCart}>Weiter zur Zusammenfassung</Button>
</div>
