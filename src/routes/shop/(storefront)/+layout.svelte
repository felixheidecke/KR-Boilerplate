<script lang="ts">
	import { CART } from '../stores'
	import { shopPath } from '../config'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Link from '$lib/boilerplate/components/Link/Link.svelte'
	import Button from '$lib/boilerplate/components/Button/Button.svelte'

	const { categories } = $$props.data
</script>

<Client browser>
	<section>
		<main>
			<slot />
		</main>
		<aside>
			{#if $CART.products?.length}
				<h3>Ihr Warenkorb:</h3>
				<ul class="$mt $font-small">
					{#each $CART.products as { product, quantity }}
						<li class="$overflow-ellipsis">
							{quantity}&times; {product.name}
						</li>
					{/each}
				</ul>
				<ul class="$mt-1/2 $font-small">
					<li class="$mb-1/4 $flex $space-between">
						<b>Zwischensumme:</b>&nbsp;
						<span>{$CART.gross?.formatted}</span>
					</li>

					{#if $CART.supplementalCost}
						<li class="$mb-1/4 $flex $space-between">
							<b>{$CART.supplementalCost.title}:</b>
							<span>{$CART.supplementalCost.formatted}</span>
						</li>
					{/if}
					{#if $CART.shippingCost.value}
						<li class="$mb-1/4 $flex $space-between">
							<b>Versand:</b>
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
				<Button icon="fas fa-shopping-cart" to="{shopPath}/cart" class="$mt">Zum Warenkorb</Button>
				<hr />
			{/if}
			<h3 class="$hidden@tablet-down">Kategorien:</h3>
			<ol>
				{#each categories as { id, slug, name }}
					<li>
						<Link to="{shopPath}/{slug}_c{id}">
							{name}
						</Link>
					</li>
				{/each}
			</ol>
		</aside>
	</section>
</Client>

<style lang="scss">
	@import '$variables';

	section {
		display: grid;
		grid-template-columns: 1fr 16rem;
		grid-template-areas: 'main aside';
		gap: 2rem;
	}

	main {
		grid-area: main;
	}

	aside {
		grid-area: aside;
	}

	@include breakpoint('desktop-up') {
		aside {
			position: sticky;
			top: 0;
			align-self: start;
		}
	}

	@include breakpoint('tablet-down') {
		section {
			grid-template-columns: 1fr;
			grid-template-areas: 'aside' 'produkte';
		}

		ol {
			display: flex;
			flex-wrap: wrap;
			gap: 0.25rem 2rem;

			li {
				padding-left: 0.5rem;
				margin-left: 1rem;
				&::marker {
					color: $c-dark;
					content: '\274d';
				}
			}
		}
	}
</style>
