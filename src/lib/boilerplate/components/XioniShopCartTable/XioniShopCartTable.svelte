<script lang="ts">
	import { range } from 'lodash-es'
	import { createEventDispatcher } from 'svelte'

	import Select from '../Select/Select.svelte'
	import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'
	import Button from '../Button/Button.svelte'
	import Icon from '../Icon/Icon.svelte'

	export let products: XioniShop.Cart['products']
	export let supplementalCost: XioniShop.Cart['supplementalCost']
	export let shippingCost: XioniShop.Cart['shippingCost']
	export let total: XioniShop.Cart['total']
	export let quantitySelector = false
	export let readOnly = false

	const emit = createEventDispatcher()

	async function update(productId: number, { target }: any) {
		emit('product-quantity-update', { productId, quantity: +target.value })
	}

	// async function remove(productId: number) {
	// 	emit('product-quantity-update', { productId, quantity: 0 })
	// }
</script>

<table class="XioniShopCartTable $w-full {$$props.class}">
	<thead>
		<tr>
			<th>Produkt</th>
			<th>Menge</th>
			<th>Einzelpreis</th>
			<th style="width:6rem">Preis</th>
		</tr>
	</thead>
	<tbody>
		{#each products || [] as { product, total, quantity }}
			<tr>
				<td> {product.name} <small>({product.code})</small></td>
				<td>
					{#if quantitySelector}
						<Select
							options={range(0, 11)}
							values={range(0, 11)}
							value={quantity}
							class="select-quantity"
							disabled={readOnly}
							on:change={event => update(product.id, event)} />
					{:else}
						{product.quantity}
					{/if}
				</td>
				<td class="$text-right">{product.price.formatted}</td>
				<td class="$text-right">{total.formatted}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		{#if supplementalCost}
			<tr>
				<td>{supplementalCost.title}</td>
				<td class="$text-right" colspan="2"><small>(pauschal)</small> </td>
				<td class="$text-right">{supplementalCost.formatted}</td>
			</tr>
		{/if}
		{#if shippingCost}
			<tr>
				<td colspan="3">Versandkosten</td>
				<td class="$text-right">{shippingCost.formatted}</td>
			</tr>
		{/if}
		<tr aria-hidden>
			<td colspan="4"><hr class="$m-0" /></td>
		</tr>
		<tr class="$font-bold">
			<td colspan="3">Gesamtpreis <em>(inkl. MwSt.)</em></td>
			<td class="$text-right $decoration-double-underline">{total.formatted}</td>
		</tr>
	</tfoot>
</table>

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
