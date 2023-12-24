<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation'
	import { isBoolean, isEmpty, omitBy } from 'lodash-es'
	import Shop, { ORDER, CART } from '../../ShopApi'
	import { shopPath } from '../../config'
	import { IS_MOBILE } from '$lib/utils/breakpoints'

	import { ImputPropsType } from '$lib/boilerplate/components/Input/Input.types'
	import type { XioniFetchErrorResponse } from '$lib/boilerplate/xioni/utils/xioniFetch'
	import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Checkbox from '$lib/boilerplate/components/Checkbox/Checkbox.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Input from '$lib/boilerplate/components/Input/Input.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'
	import Select from '$lib/boilerplate/components/Select/Select.svelte'
	import Textarea from '$lib/boilerplate/components/Textarea/Textarea.svelte'

	// -----------------------------------------------------------------------------------------------

	let isLoading = false
	let showShippingForm = !!$ORDER.shippingAddress
	let formErrors = {} as { [key: string]: string[] }

	// Form bindings
	let address = { ...$ORDER.address } || {}
	let shippingAddress = { ...$ORDER.shippingAddress } || {}
	let message = $ORDER.message || ''

	function toggleLoading(status?: boolean) {
		isLoading = isBoolean(status) ? status : !isLoading
	}

	function toggleShippingForm() {
		if (showShippingForm) {
			showShippingForm = false
			shippingAddress = {}
		} else {
			showShippingForm = true
		}
	}

	function errorHandler(error: XioniFetchErrorResponse) {
		formErrors = error.data.payload as any

		document.querySelector('.Message')?.scrollIntoView({ behavior: 'smooth' })
	}

	function successHandler(order: XioniShop.Order) {
		ORDER.set(order)
		goto(shopPath + '/checkout/summary')

		formErrors = {}
	}

	function updateCart() {
		const addressData = omitBy(address, isEmpty) as any
		const shippingAddressData = omitBy(shippingAddress, isEmpty) as any

		Shop.order.updateOrder({
			address: addressData,
			shippingAddress: !isEmpty(shippingAddress) ? shippingAddressData : null,
			message: message.trim() || null
		})
	}

	Shop.order.$event
		.on('loading-toggle', toggleLoading)
		.on('error', errorHandler)
		.on('success', successHandler)

	beforeNavigate(() => {
		Shop.order.$event
			.off('loading-toggle', toggleLoading)
			.off('error', errorHandler)
			.off('success', successHandler)
	})
</script>

<h1 class="h2">Kasse</h1>

<p>
	Der Gesamtrechnungsbetrag von <span class="$decoration-double-underline">
		{$CART.total?.formatted}
	</span>
	wird per Vorkasse beglichen.
</p>

<h2 class="h3">Rechnungsanschrift</h2>

{#if formErrors.address}
	<Message title="⛔️ Eingabefehler" type="error" class="$mb">
		<ul>
			{#each formErrors.address as error}
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
			type={ImputPropsType.TEL}
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

	{#if formErrors.shippingAddress}
		<Message title="⛔️ Eingabefehler" type="error" class="$mb">
			<ul>
				{#each formErrors.shippingAddress as error}
					<li>{error}</li>
				{/each}
			</ul>
		</Message>
	{/if}

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
		<Grid size="1-4 tablet-1-3">
			<Input bind:value={shippingAddress.zip} name="zip" label="PLZ" required />
		</Grid>
		<Grid size="3-4 tablet-2-3">
			<Input bind:value={shippingAddress.city} label="Ort" required />
		</Grid>
	</Grid>
{/if}

<div class="$mt-3">
	<h3 class="h4">Ihre Nachricht</h3>

	{#if formErrors.message}
		<Message title="" type="error" class="$mb">
			{formErrors.message[0]}
		</Message>
	{/if}

	<Textarea bind:value={message} rows="4" name="message" label="Nachricht" />
</div>

<Button
	icon={isLoading ? 'fas fa-spinner fa-pulse' : 'fas fa-angle-right'}
	class={[
		{
			'$mt $w-full $content-center': $IS_MOBILE
		},
		'Button--primary $mt-2 $float-right $row-reverse'
	]}
	disabled={isLoading}
	on:click={updateCart}>weiter zur Zusammenfassung</Button>
