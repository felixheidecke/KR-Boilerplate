<script lang="ts">
	import './XioniShopProduct.scss'

	import { IS_MOBILE } from '$lib/boilerplate/utils/breakpoints'
	import { page } from '$app/state'
	import classnames from 'classnames'
	import type { XioniShopProductProps } from './XioniShopProduct'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Grid from '../Grid/Grid.svelte'
	import Modal from '../Modal/Modal.svelte'
	import Button from '../Button/Button.svelte'
	import Link from '../Link/Link.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const {
		product,
		baseName = 'XioniShopProduct',
		basePath = page.url.pathname + '/../',

		class: className,

		onAddToCart
	}: XioniShopProductProps = $props()

	// -----------------------------------------------------------------------------------------------

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
		ean
	} = product

	let productImageModal: Modal

	function imageClickHandler() {
		if ($IS_MOBILE) return

		productImageModal.open()
	}

	function addToCartHandler() {
		if (!onAddToCart) return

		onAddToCart(product)
	}
</script>

{#if product.id}
	<div class={classnames(baseName, className)}>
		<ul class="{baseName}__breadcrubs">
			{#each path || [] as { id, name, slug }}
				<li class="{baseName}__breadcrubs-crub">
					<Link to="{basePath}{slug}-c-{id}">{name}</Link>
				</li>
			{/each}
		</ul>
		<h2 class="{baseName}__name $mb-2 $mt-1/2">
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
			<Grid size="tablet-2-5">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<img
					class="{baseName}__image $mb-2@mobile"
					src={image?.src || 'https://cdn.klickrhein.de/boilerplate/shop/product-placeholder.png'}
					alt={name}
					onclick={imageClickHandler} />
			</Grid>
			<Grid size="tablet-3-5">
				{#if teaser}
					<p class="{baseName}__teaser">{@html teaser}</p>
				{/if}
				{#if price}
					<div class="{baseName}__price-box">
						<span class="{baseName}__price" data-price={price.value}>
							{price.formatted}
						</span>
						<span class="{baseName}__tax $pl-1/2" data-vat={vat.value}>
							inkl. {vat.formatted} MwSt.
						</span>
						<br />
						{#if quantity.value > 1 && pricePerUnit}
							<span class="{baseName}__quantity $font-larger">
								{quantity.formatted} / {pricePerUnit.formatted}
							</span>
						{/if}
					</div>

					<Button
						variant="primary"
						onClick={addToCartHandler}
						class="{baseName}__add-to-cart-button"
						fontello="basket">
						In den Warenkorb
					</Button>
				{/if}

				{#if description}
					<p class="{baseName}__description">{@html description}</p>
				{/if}

				{#if legal}
					<p class="{baseName}__legal-info">
						{@html legal}
					</p>
				{/if}
			</Grid>
		</Grid>
	</div>

	<Modal bind:this={productImageModal} title={name}>
		<img
			class="{baseName}__image-presentation"
			src={image?.src || 'https://cdn.klickrhein.de/boilerplate/shop/product-placeholder.png'}
			alt={name} />
	</Modal>
{/if}
