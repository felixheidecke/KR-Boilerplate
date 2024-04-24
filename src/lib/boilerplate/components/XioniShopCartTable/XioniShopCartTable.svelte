<script lang="ts">
	import './XioniShopCartTable.css'

	import { range } from 'lodash-es'
	import { createEventDispatcher } from 'svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/xioni/shop/XioniShop.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Select from '../Select/Select.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let products: XioniShop.Cart['products']
	export let supplementalCost: XioniShop.Cart['supplementalCost']
	export let shipping: XioniShop.Cart['shipping']
	export let total: XioniShop.Cart['total']
	export let quantitySelector = false
	export let readOnly = false

	// -----------------------------------------------------------------------------------------------

	const emit = createEventDispatcher()

	function update(productId: number, { target }: any) {
		emit('product-quantity-update', { productId, quantity: +target.value })
	}
</script>

<table data-component class="XioniShopCartTable">
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
				<td width="66%">
					{product.name}
					{#if product.code}
						<small>({product.code})</small>{/if}</td>
				<td>
					{#if quantitySelector}
						<Select
							options={range(0, 11)}
							values={range(0, 11)}
							value={quantity}
							class="XioniShopCartTable__select-quantity"
							disabled={readOnly}
							on:change={event => update(product.id, event)} />
					{:else}
						{quantity}
					{/if}
				</td>
				<td class="$text-right">{product.price.formatted}</td>
				<td class="$text-right">{total.formatted}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr aria-hidden>
			<td colspan="4"><hr class="$m-0" /></td>
		</tr>
		{#if supplementalCost}
			<tr>
				<td colspan="3" class="$text-right $font-bold">{supplementalCost.title}:</td>
				<td class="$text-right">{supplementalCost.formatted}</td>
			</tr>
		{/if}
		{#if shipping}
			<tr>
				<td colspan="3" class="$text-right $font-bold">Versand:</td>
				<td class="$text-right">{shipping.price.formatted}</td>
			</tr>
		{/if}
		<tr>
			<td colspan="3" class="$text-right $font-bold"
				>Gesamt:
				<span class="$font-small $font-italic">(inkl. MwSt.)</span></td>
			<td class="$text-right $font-bold $decoration-double-underline">{total.formatted}</td>
		</tr>
	</tfoot>
</table>

<style lang="scss">
	[data-component] {
		:global(.Select) {
			max-width: 4rem;
		}

		:global(.Select__input) {
			text-align: center;
		}
	}
</style>
