<script lang="ts">
	import { CATEGORIES, CART } from './stores'

	// --- [ Components ] ----------------------------------------------------------------------------
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Button from '$lib/boilerplate/components/Button/Button.svelte'
</script>

<Client browser>
	<Grid>
		<Grid size="3-4" class="$pr-3">
			<slot />
		</Grid>
		<Grid size="1-4">
			<div>
				<Button icon="fas fa-shopping-cart" to="/shop/warenkorb" class="$w-full">Warenkorb</Button>

				<ul class="$mt $font-small">
					{#each $CART.products || [] as product}
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
				<hr />
				<ul>
					{#each $CATEGORIES as category}
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
