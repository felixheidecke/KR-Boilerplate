<script lang="ts">
	import { CART } from './stores'
	import { shopPath } from './config'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Button from '$lib/boilerplate/components/Button/Button.svelte'

	const { categories } = $$props.data
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
					{#each $CART.products as { product, quantity }}
						<li class="$overflow-ellipsis">
							{quantity}&times; {product.name}
						</li>
					{/each}
				</ul>
				<ul class="$mt-1/2 $font-small">
					<li class="$mb-1/4 $flex $space-between">
						<b>Zwischensumme:</b>
						<span>{$CART.gross?.formatted}</span>
					</li>

					{#if $CART.supplementalCost}
						<li class="$mb-1/4 $flex $space-between">
							<b>{$CART.supplementalCost.title}:</b>
							<span>{$CART.supplementalCost.formatted}</span>
						</li>
					{/if}
					{#if $CART.shippingCost}
						<li class="$mb-1/4 $flex $space-between">
							<b>Versandkosten:</b>
							<span>{$CART.shippingCost.formatted}</span>
						</li>
					{/if}
					{#if $CART.total}
						<li class="$flex $space-between">
							<b>Gesamt:</b>
							<span class="$font-bold $decoration-double-underline">{$CART.total.formatted}</span>
						</li>
					{/if}
				</ul>
				<Button icon="fas fa-shopping-cart" to="{shopPath}/cart" class="checkout-button $mt">
					Zum Warenkorb
				</Button>
				<hr />
				<h3>Kategorien:</h3>

				<ul>
					{#each categories as category}
						<li>
							<Link to="{shopPath}/{category.slug}_c{category.id}">
								{category.name}
							</Link>
						</li>
					{/each}
				</ul>

				<ul class="$mt-2">
					<li>
						<Link to="{shopPath}/agb">AGB</Link>
					</li>
					<li>
						<Link to="{shopPath}/agb/widerrufsrecht">Widerrufsrecht</Link>
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
