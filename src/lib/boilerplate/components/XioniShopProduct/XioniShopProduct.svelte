<script lang="ts">
	import './XioniShopProduct.scss'

	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'
	import { IS_MOBILE } from '$lib/utils/breakpoints'

	import type { XioniShop } from '$lib/boilerplate/xioni/shop/XioniShop.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Grid from '../Grid/Grid.svelte'
	import Modal from '../Modal/Modal.svelte'
	import Button from '../Button/Button.svelte'
	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let product: XioniShop.Product.Full

	const {
		name,
		teaser,
		path,
		description,
		legal,
		pricePerUnit,
		quantity,
		price,
		vat,
		image,
		code,
		ean,
		pdf
	} = product

	// -----------------------------------------------------------------------------------------------

	// Refs
	let addToCartModal: Modal
	let productImageModal: Modal

	const emit = createEventDispatcher()
	const baseClass = 'XioniShopProduct'

	function addToCartHandler() {
		emit('addToCart', product.$id)
		addToCartModal.open()
	}

	function imageClickHandler() {
		if ($IS_MOBILE) return

		productImageModal.open()
	}
</script>

{#if product.$id}
	<div class={classnames(baseClass, $$props.class)}>
		<ul class="{baseClass}__breadcrubs">
			{#each path || [] as { $id, name, slug }}
				<li class="{baseClass}__breadcrubs-crub">
					<Link to="/shop/c{$id}-{slug}">{name}</Link>
				</li>
			{/each}
		</ul>
		<h2 class="{baseClass}__name $mb-2 $mt-1/2">
			{name}
		</h2>

		<ul class="$flex $gap">
			{#if code}
				<li class="$mb-2">Art.-Nr.: {code}</li>
			{/if}
			{#if ean}
				<li>EAN: {ean}</li>
			{/if}
		</ul>

		<Grid gap>
			<Grid size="tablet-1-3">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img
					class="{baseClass}__image $mb-2@mobile"
					src={image?.src ||
						'https://assets.klickrhein.de/boilerplate/shop/product-placeholder.png'}
					alt={name}
					on:click={imageClickHandler} />
			</Grid>
			<Grid size="tablet-2-3">
				{#if teaser}
					{@html teaser}
				{/if}
				{#if price}
					<div class="{baseClass}__price-box">
						<span class="{baseClass}__price" data-price={price.value}>
							{price.formatted}
						</span>
						<span class="{baseClass}__tax $pl-1/2" data-vat={vat.value}>
							inkl. {vat.formatted} MwSt.
						</span>
						<br />
						{#if quantity.value > 1 && pricePerUnit}
							<span class="{baseClass}__quantity $font-larger">
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
				{/if}

				{#if description}
					{@html description}
				{/if}

				{#if legal}
					<div class="{baseClass}__legal-info">
						{@html legal}
					</div>
				{/if}

				{#if pdf}
					<Link icon="fas fa-file-pdf" to={pdf.src} target="_blank">{pdf.name}</Link>
				{/if}
			</Grid>
		</Grid>
	</div>

	<Modal bind:this={productImageModal} title={name}>
		<img
			class="{baseClass}__image-presentation"
			src={image?.src || 'https://assets.klickrhein.de/boilerplate/shop/product-placeholder.png'}
			alt={name} />
	</Modal>

	<Modal bind:this={addToCartModal} title={name}>
		<p>wurde dem Warenkorb hinzugefügt.</p>
		<p>Wie soll es weitergehen?</p>
		<div slot="footer">
			<Button on:click={addToCartModal.close} to="/shop">weiter einkaufen</Button>
			<Button on:click={addToCartModal.close} class="$float-right" to="/warenkorb"
				>zum Warenkorb</Button>
		</div>
	</Modal>
{/if}
