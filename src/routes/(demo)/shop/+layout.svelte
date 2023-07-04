<script lang="ts">
	import { CART } from './_stores'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Button from '$lib/boilerplate/components/Button/Button.svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { ShopCategory } from '$lib/boilerplate/libraries/xioni-shop/categories.types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let data

	$: categories = data.categories as ShopCategory[]
</script>

<Client browser>
	<Grid>
		<Grid size="3-4" class="$pr-3">
			<slot />
		</Grid>
		<Grid size="1-4">
			<div>
				<h3>Warenkorb:</h3>
				<ul class="$mt $font-small">
					{#each $CART.products as product}
						<li class="$overflow-ellipsis">
							{product.quantity}&times; {product.name}
						</li>
					{/each}
				</ul>
				<ul class="$mt-1/2 $font-small">
					<li class="$mb-1/4 $flex $space-between">
						<b>Zwischensumme:</b>
						<span>{$CART.gross?.formatted}</span>
					</li>

					{#if $CART.additionalCost}
						<li class="$mb-1/4 $flex $space-between">
							<b>{$CART.additionalCost.title}:</b>
							<span>{$CART.additionalCost.formatted}</span>
						</li>
					{/if}
					{#if $CART.shipping}
						<li class="$mb-1/4 $flex $space-between">
							<b>Versandkosten:</b>
							<span>{$CART.shipping.formatted}</span>
						</li>
					{/if}
					{#if $CART.total}
						<li class="$flex $space-between">
							<b>Gesamt:</b>
							<span class="$font-bold $decoration-double-underline">{$CART.total.formatted}</span>
						</li>
					{/if}
				</ul>
				<Button icon="fas fa-shopping-cart" to="/shop/checkout/cart" class="checkout-button $mt">
					Zum Warenkorb
				</Button>
				<hr />
				<h3>Kategorien:</h3>

				<ul>
					{#each categories as category}
						<li>
							<Link to="/shop/{category.slug}_c{category.id}">
								{category.name}
							</Link>
						</li>
					{/each}
				</ul>

				<ul class="$mt-2">
					<li>
						<Link to="/shop/agb">AGB</Link>
					</li>
					<li>
						<Link to="/shop/agb/widerrufsrecht">Widerrufsrecht</Link>
					</li>
				</ul>
			</div>
		</Grid>
	</Grid>
</Client>

<style>
	:global(.checkout-button) {
		width: 100%;
		background-color: #333;
		color: white;
		justify-content: center;
	}
</style>
