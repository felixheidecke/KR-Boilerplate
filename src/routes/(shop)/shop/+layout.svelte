<script lang="ts">
	import stammdaten from '$stammdaten'
	import { CART } from '../shopApi'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'

	export let data

	$: ({ products, total } = $CART.data)
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
						{#if total}
							<li class="$mt-1/2 $flex $space-between">
								<b>Gesamt:</b>
								<span class="$font-bold $decoration-double-underline">{total.formatted}</span>
							</li>
						{/if}
					</ul>
					<Button
						icon="fas fa-shopping-cart"
						to="/warenkorb"
						class="$mt $w-full $content-center $font-small">Zum Warenkorb</Button>
					<hr />
				{/if}
				<h4 class="$hidden@tablet-down">Kategorien:</h4>
				<ol class="$flex $flex-wrap $gap-1/2 $flex-column@desktop">
					{#each data.categories as { $id, slug, name, subcategories }}
						<li>
							<Link to="/shop/c{$id}-{slug}">
								{name}
							</Link>
							{#if subcategories.length}
								<ul class="$ml-1/2 $font-small">
									{#each subcategories as { $id, slug, name }}
										<li>
											<Link to="/shop/c{$id}-{slug}">
												{name}
											</Link>
										</li>
									{/each}
								</ul>
							{/if}
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
