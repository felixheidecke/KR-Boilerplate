<script lang="ts">
	import { shopPath } from '../shopConfig'
	import { CART } from '../shopApi'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import stammdaten from '$stammdaten'

	const { categories } = $$props.data

	$: ({ products, gross, supplementalCost, shippingCost, total } = $CART.data)
</script>

<svelte:head>
	<title>{stammdaten.name} Online Shop</title>
</svelte:head>

<Client browser>
	<Grid gap={2} tag="section" class="$flex-column@tablet-down">
		<Grid size="desktop-1-4" tag="aside" class="$order-1@tablet-down">
			<div class="sidebar">
				{#if products?.length}
					<h3>Warenkorb:</h3>
					<ul class="$mt $font-small">
						{#each products as { product, quantity }}
							<li class="$overflow-ellipsis">
								{quantity}&times; {product.name}
							</li>
						{/each}
					</ul>
					<ul class="$mt-1/2 $font-small">
						<li class="$mb-1/4 $flex $space-between">
							<b>Zwischensumme:</b>&nbsp;
							<span>{gross?.formatted}</span>
						</li>
						{#if supplementalCost}
							<li class="$mb-1/4 $flex $space-between">
								<b>{supplementalCost.title}:</b>
								<span>{supplementalCost.formatted}</span>
							</li>
						{/if}
						{#if shippingCost.value}
							<li class="$mb-1/4 $flex $space-between">
								<b>Versand:</b>
								<span>{shippingCost.formatted}</span>
							</li>
						{/if}
						{#if total}
							<li class="$flex $space-between">
								<b>Gesamt:</b>
								<span class="$font-bold $decoration-double-underline">{total.formatted}</span>
							</li>
						{/if}
					</ul>
					<Button
						icon="fas fa-shopping-cart"
						to="{shopPath}/cart"
						class="$mt $w-full $content-center $font-small">Zum Warenkorb</Button>
					<hr />
				{/if}
				<h3 class="$hidden@tablet-down">Kategorien:</h3>
				<ol class="$flex $flex-wrap $gap-1/2 $flex-column@desktop">
					{#each categories as { id, slug, name }}
						<li>
							<Link to="{shopPath}/c{id}-{slug}">
								{name}
							</Link>
						</li>
					{/each}
				</ol>
			</div>
		</Grid>
		<Grid size="desktop-3-4" tag="main" class="$order-2@tablet-down">
			<slot />
		</Grid>
	</Grid>
</Client>
