<script lang="ts">
	import { CART, ORDER } from '$lib/stores'
	import { goto } from '$app/navigation'
	import { head, isEmpty, omitBy } from 'lodash-es'
	import { InputPropsType } from '$lib/boilerplate/components/Input/Input.types'
	import { IS_MOBILE } from '$lib/boilerplate/utils/breakpoints'
	import { useOrder } from '$lib/boilerplate/xioni/shop/Order'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Checkbox from '$lib/boilerplate/components/Checkbox/Checkbox.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Input from '$lib/boilerplate/components/Input/Input.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'
	import Select from '$lib/boilerplate/components/Select/Select.svelte'
	import Textarea from '$lib/boilerplate/components/Textarea/Textarea.svelte'
	import Wrapper from '$lib/boilerplate/components/Wrapper/Wrapper.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading = false
	let showShippingForm = !!$ORDER.deliveryAddress
	let formBodyErrors: string[] | undefined = undefined
	let formMessageError: string | undefined = undefined

	// Form bindings
	let address = { ...$ORDER.address }
	let deliveryAddress = { ...$ORDER.deliveryAddress }
	let message = $ORDER.message || ''

	function toggleLoading() {
		isLoading = !isLoading
	}

	function toggleShippingForm() {
		if (showShippingForm) {
			showShippingForm = false
			deliveryAddress = {}
		} else {
			showShippingForm = true
		}
	}

	function updateOrder() {
		const addressData = omitBy(address, isEmpty) as any
		const deliveryAddressData = omitBy(deliveryAddress, isEmpty) as any

		toggleLoading()

		useOrder()
			.updateOrder({
				address: addressData,
				deliveryAddress: !isEmpty(deliveryAddress) ? deliveryAddressData : null,
				message: message.trim() || null
			})
			.then(order => {
				ORDER.set(order)
				goto('/checkout/summary/')
			})
			.catch(error => {
				const data = error.details as any // Still version 5

				formBodyErrors = data?.body
				formMessageError = data?.message ? head(data?.message) : undefined

				setTimeout(
					() => document.querySelector('.Message')?.scrollIntoView({ behavior: 'smooth' }),
					250
				)
			})
			.finally(toggleLoading)
	}
</script>

<Wrapper size="small" class="$mb-2">
	<h1 class="h2">Kasse</h1>

	<p>
		Aktueller Rechnungsbetrag: <span class="$decoration-double-underline">
			{$CART.total?.formatted}
		</span> <small>(inkl. MwSt.)</small>
	</p>

	<h2 class="h3">Rechnungsanschrift</h2>

	{#if formBodyErrors}
		<Message title="⛔️ Eingabefehler" type="error" class="$mb">
			<ul>
				{#each formBodyErrors as error}
					<li>{error}</li>
				{/each}
			</ul>
		</Message>
	{/if}

	<Grid gap>
		<Grid size="1">
			<Input bind:value={address.company} name="company" label="Firma" />
		</Grid>
		<Grid size="tablet-1-5">
			<Select bind:value={address.salutation} options={['Herr', 'Frau']} label="Anrede" />
		</Grid>
		<Grid size="tablet-2-5">
			<Input bind:value={address.firstname} name="firstname" label="Vorname" required />
		</Grid>
		<Grid size="tablet-2-5">
			<Input bind:value={address.name} name="lastname" label="Nachname" required />
		</Grid>
		<Grid size>
			<Input bind:value={address.address} name="address" label="Straße & Hausnummer" required />
		</Grid>
		<Grid size="1-4 tablet-1-3">
			<Input bind:value={address.zip} name="zip" label="PLZ" required />
		</Grid>
		<Grid size="3-4 tablet-2-3">
			<Input bind:value={address.city} name="city" label="Ort" required />
		</Grid>
		<Grid size="1">
			<Input
				type={InputPropsType.TEL}
				bind:value={address.phone}
				name="phone"
				label="Telefonnummer"
				required />
		</Grid>
		<Grid size="1">
			<Input bind:value={address.email} name="email" label="E-Mail-Adresse" required />
		</Grid>
	</Grid>

	<Checkbox
		class="$my"
		checked={!showShippingForm}
		on:change={toggleShippingForm}
		label="Lieferadresse entspricht der Rechnungsadresse" />

	{#if showShippingForm}
		<h2 class="h3">Lieferadresse</h2>

		<Grid gap>
			<Grid size>
				<Input bind:value={deliveryAddress.company} label="Firma" />
			</Grid>
			<Grid size>
				<Input bind:value={deliveryAddress.name} label="Vor- und Nachname" required />
			</Grid>
			<Grid size>
				<Input bind:value={deliveryAddress.address} label="Straße & Hausnummer" required />
			</Grid>
			<Grid size="1-4 tablet-1-3">
				<Input bind:value={deliveryAddress.zip} name="zip" label="PLZ" required />
			</Grid>
			<Grid size="3-4 tablet-2-3">
				<Input bind:value={deliveryAddress.city} label="Ort" required />
			</Grid>
		</Grid>
	{/if}

	<div class="$mt-3">
		<h3 class="h4">Ihre Nachricht</h3>

		{#if formMessageError}
			<Message title="" type="error" class="$mb">
				{formMessageError}
			</Message>
		{/if}

		<Textarea bind:value={message} rows={4} name="message" label="Nachricht" />
	</div>

	<div class="$flex $content-right">
		<Button
			fontello="angle-right"
			class={[
				{
					'$mt $w-full $content-center': $IS_MOBILE
				},
				'Button--primary $mt-2 $row-reverse'
			].join(' ')}
			disabled={isLoading}
			onClick={updateOrder}>weiter zur Zusammenfassung</Button>
	</div>
</Wrapper>
