<script lang="ts">
	import './XioniShopProduct.css'

	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Grid from '../Grid/Grid.svelte'
	import Modal from '../Modal/Modal.svelte'
	import Button from '../Button/Button.svelte'
	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const {
		id,
		name,
		teaser,
		category,
		description,
		legal,
		pricePerUnit,
		quantity,
		price,
		vat,
		image
	} = $$props.product as XioniShop.Product

	// -----------------------------------------------------------------------------------------------

	// Refs
	let modal: Modal

	const emit = createEventDispatcher()
	const baseClass = 'XioniShopProduct'

	function addToCartHandler() {
		emit('addToCart', id)
		modal.open()
	}
</script>

{#if id}
	<div class={classnames(baseClass, $$props.class)}>
		{#if category}
			<Link to="/shop/{category.name}_c{category.id}">{category?.name}</Link>
		{/if}
		<h2 class="{baseClass}__name $mb-2 $mt-1/2">
			{name}
		</h2>

		<Grid gap>
			<Grid size="tablet-1-3">
				<img
					class="{baseClass}__image $mb-2@mobile"
					src={image?.src || 'https://via.placeholder.com/268x268.png?text=Kein+Produktbild'}
					alt={name} />
			</Grid>
			<Grid size="tablet-2-3">
				<div class="$font-bold">
					{@html teaser}
				</div>
				<div class="{baseClass}__price-box">
					<span class="{baseClass}__price" data-price={price.value}>
						{price.formatted}
					</span>
					<span class="{baseClass}__tax $pl-1/2" data-vat={vat.value}>
						inkl. {vat.formatted} MwSt.
					</span>
					<br />
					{#if quantity.value > 1 && pricePerUnit}
						<span class="{baseClass}__quantity">
							{quantity.formatted} / {pricePerUnit.formatted}
						</span>
					{/if}
				</div>

				<Button
					on:click={addToCartHandler}
					class="{baseClass}__add-to-cart-button"
					icon="fas fa-cart-arrow-down">
					In den Warenkorb
				</Button>

				{#if description}
					{@html description}
				{/if}

				{#if legal}
					<div class="{baseClass}__legal-info">
						{@html legal}
					</div>
				{/if}
			</Grid>
		</Grid>
	</div>

	<Modal bind:this={modal} title={name}>
		<p>wurde dem Warenkorb hinzugefügt.</p>
		<p>Wie soll es weitergehen?</p>
		<div slot="footer">
			<Button on:click={modal.close} to="/shop">weiter einkaufen</Button>
			<Button on:click={modal.close} class="$float-right" to="/shop/cart">zum Warenkorb</Button>
		</div>
	</Modal>
{/if}
