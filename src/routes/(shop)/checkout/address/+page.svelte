<script lang="ts">
	import { CART, ORDER } from '../../shopApi'
	import { goto } from '$app/navigation'
	import { IS_MOBILE } from '$lib/utils/breakpoints'
	import { isEmpty, omitBy } from 'lodash-es'

	import { ImputPropsType } from '$lib/boilerplate/components/Input/Input.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Checkbox from '$lib/boilerplate/components/Checkbox/Checkbox.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Input from '$lib/boilerplate/components/Input/Input.svelte'
	import Message from '$lib/boilerplate/components/Message/Message.svelte'
	import Select from '$lib/boilerplate/components/Select/Select.svelte'
	import Textarea from '$lib/boilerplate/components/Textarea/Textarea.svelte'
	import { onDestroy } from 'svelte'

	// -----------------------------------------------------------------------------------------------

	let showShippingForm = !!$ORDER.data.deliveryAddress
	let formErrors = $ORDER.errors?.data.details as undefined | { [key: string]: string[] }

	// Form bindings
	let address = { ...$ORDER.data.address } || {}
	let deliveryAddress = { ...$ORDER.data.deliveryAddress } || {}
	let message = $ORDER.data.message || ''

	const unsubscribe = ORDER.subscribe(({ errors }) => {
		formErrors = errors?.data.details as unknown as { [key: string]: string[] }

		if (formErrors) {
			setTimeout(
				() => document.querySelector('.Message')?.scrollIntoView({ behavior: 'smooth' }),
				250
			)
		}
	})

	function toggleShippingForm() {
		if (showShippingForm) {
			showShippingForm = false
			deliveryAddress = {}
		} else {
			showShippingForm = true
		}
	}

	async function updateCart() {
		const addressData = omitBy(address, isEmpty) as any
		const deliveryAddressData = omitBy(deliveryAddress, isEmpty) as any
		const [_, error] = await ORDER.update({
			address: addressData,
			deliveryAddress: !isEmpty(deliveryAddress) ? deliveryAddressData : null,
			message: message.trim() || null
		})

		if (!error) {
			goto('/checkout/summary')
		}
	}

	onDestroy(unsubscribe)
</script>

<h1 class="h2">Kasse</h1>

<p>
	Aktueller Rechnungsbetrag: <span class="$decoration-double-underline">
		{$CART.data.total?.formatted}
	</span> <small>(inkl. MwSt.)</small>
</p>

<h2 class="h3">Rechnungsanschrift</h2>

{#if formErrors?.body}
	<Message title="⛔️ Eingabefehler" type="error" class="$mb">
		<ul>
			{#each formErrors.body as error}
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

	<!-- {#if formErrors?.deliveryAddress}
		<Message title="⛔️ Eingabefehler" type="error" class="$mb">
			<ul>
				{#each formErrors.deliveryAddress as error}
					<li>{error}</li>
				{/each}
			</ul>
		</Message>
	{/if} -->

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

	{#if formErrors?.message}
		<Message title="" type="error" class="$mb">
			{formErrors.message[0]}
		</Message>
	{/if}

	<Textarea bind:value={message} rows="4" name="message" label="Nachricht" />
</div>

<Button
	icon={$ORDER.isLoading ? 'fas fa-spinner fa-pulse' : 'fas fa-angle-right'}
	class={[
		{
			'$mt $w-full $content-center': $IS_MOBILE
		},
		'Button--primary $mt-2 $float-right $row-reverse'
	]}
	disabled={$ORDER.isLoading}
	on:click={updateCart}>weiter zur Zusammenfassung</Button>
