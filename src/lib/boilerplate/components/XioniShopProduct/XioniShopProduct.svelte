<script lang="ts">
	import './XioniShopProduct.css'
	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'

	const emit = createEventDispatcher()

	// --- Components --------------------------------------------------------------------------------

	import Grid from '../Grid/Grid.svelte'
	import Modal from '../Modal/Modal.svelte'
	import Button from '../Button/Button.svelte'
	import type { XioniShopProduct } from '$lib/boilerplate/libraries/xioni-shop/products.types'

	// --- Props -------------------------------------------------------------------------------------

	const { id, name, teaser, description, legalInfo, pricePerUnit, quantity, price, VAT, image } =
		$$props.product as XioniShopProduct

	// --- Data --------------------------------------------------------------------------------------

	let modal: Modal // ref

	const baseName = $$props['ex-class'] || 'XioniShopProduct'
	const className = classnames(baseName, $$props.class)

	// --- Methods -----------------------------------------------------------------------------------

	function addToCartHandler() {
		emit('addToCart', id)
		modal.open()
	}
</script>

{#if id}
	<div class={className}>
		<h2 class="{baseName}__name $mb-2">
			{name}
		</h2>

		<Grid gap>
			<Grid size="tablet-1-3">
				<img
					class="{baseName}__image $mb-2@mobile"
					src={image.src || 'https://via.placeholder.com/268x268.png?text=Kein+Produktbild'}
					alt={name}
				/>
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
					<span class="{baseName}__quantity">
						{quantity.formatted}
						{#if quantity.value !== 1} / {pricePerUnit.formatted}{/if}
					</span>
				</div>

				<Button
					on:click={addToCartHandler}
					class="{baseName}__add-to-cart-button"
					icon="fas fa-cart-arrow-down"
				>
					In den Warenkorb
				</Button>

				{@html description}

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
		<div slot="footer" class="$flex $items-center $space-between">
			<Button on:click={modal.close} to="/shop" icon="fas fa-shopping-bag">Weiter Shoppen</Button>
			<Button on:click={modal.close} to="/shop/warenkorb" icon="fas fa-cash-register">
				Zur Kasse
			</Button>
		</div>
	</Modal>
{/if}

<style global>
</style>
