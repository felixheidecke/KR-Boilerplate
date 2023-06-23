<script lang="ts">
	import { range } from 'lodash-es'
	import { createEventDispatcher } from 'svelte'

	import Select from '../Select/Select.svelte'

	import type { ShopCart } from '$lib/boilerplate/libraries/xioni-shop/cart.types'

	export let products: ShopCart['products']
	export let additionalCost: ShopCart['additionalCost']
	export let shipping: ShopCart['shipping']
	export let total: ShopCart['total']
	export let quantitySelector = false

	const emit = createEventDispatcher()

	async function update(productId: number, { target }: any) {
		emit('product-quantity-update', { productId, quantity: +target.value })
	}
</script>

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
		{#each products || [] as product}
			<tr>
				<td>{product.name} <em>({product.code})</em></td>
				<td>
					{#if quantitySelector}
						<Select
							options={['Entfernen', ...range(1, 11)]}
							values={range(0, 11)}
							value={product.quantity}
							class="select-quantity"
							on:change={event => update(product.id, event)} />
					{:else}
						{product.quantity}
					{/if}
				</td>
				<td class="$text-right $font-small">{product.price.formatted}</td>
				<td class="$text-right">{product.total.formatted}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		{#if additionalCost}
			<tr>
				<td colspan="3">{additionalCost.title} <em>(pauschal)</em></td>
				<td class="$text-right">{additionalCost.formatted}</td>
			</tr>
		{/if}
		{#if shipping}
			<tr>
				<td colspan="3">Versandkosten</td>
				<td class="$text-right">{shipping.formatted}</td>
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
