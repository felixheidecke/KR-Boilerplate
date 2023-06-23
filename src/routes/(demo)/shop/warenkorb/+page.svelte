<script lang="ts">
	import { range } from 'lodash-es'
	import { CART } from '../stores'
	import MakeShopCart from '$lib/boilerplate/libraries/xioni-shop/cart'

	import Button from '$lib/boilerplate/components/Button/Button.svelte'
	import Client from '$lib/boilerplate/components/Client/Client.svelte'
	import Select from '$lib/boilerplate/components/Select/Select.svelte'

	const cart = MakeShopCart($$props.data.module)

	let cartIsLoading = false

	async function update(productId: number, { target }: any) {
		const updateCart = cart.updateItemQuantity(productId, +target.value)

		cartIsLoading = true
		CART.set(await updateCart)
		cartIsLoading = false
	}
</script>

<h1>Warenkorb</h1>
<Client browser>
	{#if !$CART.products?.length}
		<h4>Ihr Warenkorb ist noch leer.</h4>
	{:else}
		<table class="$w-full">
			<thead>
				<tr>
					<th>Produkt</th>
					<th>Menge</th>
					<th>Einzelpreis</th>
					<th style="width:6rem">Preis</th>
				</tr>
			</thead>
			<tbody>
				{#each $CART.products as product}
					<tr>
						<td>{product.name} <em>({product.code})</em></td>
						<td>
							<Select
								options={['Entfernen', ...range(1, 11)]}
								values={range(0, 11)}
								value={product.quantity}
								disabled={cartIsLoading}
								class="select-quantity"
								on:change={event => update(product.id, event)} />
						</td>
						<td class="$text-right $font-small">{product.price.formatted}</td>
						<td class="$text-right">{product.total.formatted}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				{#if $CART.additionalCost}
					<tr>
						<td colspan="3">{$CART.additionalCost.title} <em>(pauschal)</em></td>
						<td class="$text-right">{$CART.additionalCost.formatted}</td>
					</tr>
				{/if}
				{#if $CART.shipping}
					<tr>
						<td colspan="3">Versandkosten</td>
						<td class="$text-right">{$CART.shipping.formatted}</td>
					</tr>
				{/if}
				<tr aria-hidden>
					<td colspan="4"><hr class="$m-0" /></td>
				</tr>
				<tr class="$font-bold">
					<td colspan="3">Gesamtpreis <em>(inkl. MwSt.)</em></td>
					<td class="$text-right $decoration-double-underline">{$CART.total?.formatted}</td>
				</tr>
			</tfoot>
		</table>
	{/if}
</Client>

<Button to="/shop/kasse" icon="fas fa-cash-register">Zur Kasse</Button>
<Button icon="fab fa-paypal">Zu Paypal</Button>

<style>
	table {
		width: 100%;
	}

	thead {
		background-color: lightgray;
	}

	th,
	td {
		padding: 0.5rem;
	}

	:global(.select-quantity) {
		text-align: center;
		padding: 0.333rem;
		max-width: 2.5rem;
	}
</style>
