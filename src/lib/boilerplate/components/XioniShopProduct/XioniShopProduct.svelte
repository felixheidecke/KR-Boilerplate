<script lang="ts">
	import './XioniShopProduct.css'
	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { ShopProduct } from '$lib/boilerplate/libraries/xioni-shop/products.types'

	// --- Components --------------------------------------------------------------------------------

	import Grid from '../Grid/Grid.svelte'
	import Modal from '../Modal/Modal.svelte'
	import Button from '../Button/Button.svelte'
	import Link from '../Link/Link.svelte'

	// --- Props -------------------------------------------------------------------------------------

	const {
		id,
		name,
		teaser,
		category,
		description,
		legalInfo,
		pricePerUnit,
		quantity,
		price,
		VAT,
		image
	} = $$props.product as ShopProduct

	// --- Data --------------------------------------------------------------------------------------

	let modal: Modal // ref

	const baseName = $$props['ex-class'] || 'XioniShopProduct'
	const className = classnames(baseName, $$props.class)

	// --- Methods -----------------------------------------------------------------------------------

	const emit = createEventDispatcher()

	function addToCartHandler() {
		emit('addToCart', id)
		modal.open()
	}
</script>

{#if id}
	<div class={className}>
		{#if category}
			<Link to="/shop/{category.slug}_c{category.id}">{category?.name}</Link>
		{/if}
		<h2 class="{baseName}__name $mb-2 $mt-1/2">
			{name}
		</h2>

		<Grid gap>
			<Grid size="tablet-1-3">
				<img
					class="{baseName}__image $mb-2@mobile"
					src={image?.src || 'https://via.placeholder.com/268x268.png?text=Kein+Produktbild'}
					alt={name} />
			</Grid>
			<Grid size="tablet-2-3">
				<div class="$font-bold">
					{@html teaser}
				</div>
				<div class="{baseName}__price-box">
					<span class="{baseName}__price" data-price={price.value}>
						{price.formatted}
					</span>
					<span class="{baseName}__tax $pl-1/2" data-vat={VAT.value}>
						inkl. {VAT.formatted} MwSt.
					</span>
					<br />
					{#if quantity.value > 0}
						<span class="{baseName}__quantity">
							{quantity.formatted}
							{#if quantity.value !== 1} / {pricePerUnit.formatted}{/if}
						</span>
					{/if}
				</div>

				<Button
					on:click={addToCartHandler}
					class="{baseName}__add-to-cart-button"
					icon="fas fa-cart-arrow-down">
					In den Warenkorb
				</Button>

				{#if description}
					{@html description}
				{/if}

				{#if legalInfo}
					<div class="{baseName}__legal-info">
						{@html legalInfo}
					</div>
				{/if}
			</Grid>
		</Grid>
	</div>

	<Modal bind:this={modal} title="Shop">
		<p>
			<strong>{name}</strong>
			wurde dem Warenkorb hinzugefügt.
		</p>
		<p>Wie soll es weiter gehen?</p>
		<div slot="footer">
			<Button on:click={modal.close} class="button__continue-shopping" to="/shop"
				>Weiter Einkaufen</Button>
			<Button on:click={modal.close} class="button__to-checkout" to="/shop/checkout/address"
				>Zur Kasse</Button>
			<Button on:click={modal.close} class="button__to-cart" to="/shop/checkout/cart"
				>Warenkorb ansehen</Button>
		</div>
	</Modal>
{/if}

<style global>
	:global(.button__to-checkout) {
		background-color: #333;
		color: white;
		float: right;
	}

	:global(.button__to-cart) {
		float: right;
		margin-right: 0.5rem;
	}
</style>
