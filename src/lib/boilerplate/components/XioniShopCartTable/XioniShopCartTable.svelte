<script lang="ts">
	import './XioniShopCartTable.scss'

	import { createEventDispatcher } from 'svelte'
	import { range } from 'lodash-es'
	import classNames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Select from '../Select/Select.svelte'
	import { Link } from '../Link'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let products: XioniShop.Cart['products']
	export let supplementalCost: XioniShop.Cart['supplementalCost']
	export let shipping: XioniShop.Cart['shipping']
	export let total: XioniShop.Cart['total']
	export let quantitySelector = false
	export let readOnly = false
	export let baseName = 'XioniShopCartTable'

	// -----------------------------------------------------------------------------------------------

	const emit = createEventDispatcher()

	function update(productId: number, { target }: any) {
		emit('product-quantity-update', { productId, quantity: +target.value })
	}
</script>

<table {...$$restProps} class={classNames(baseName, $$props.class)}>
	<thead>
		<tr>
			<th>Produkt</th>
			<th>Menge</th>
			<th>Preis</th>
		</tr>
	</thead>
	<tbody>
		{#each products || [] as { product, total, quantity }}
			<tr>
				<td width="100%">
					<Link to="/{product.slug}-p-{product.id}/">
						{product.name}
						{#if product.code}<br />
							<small>({product.code})</small>{/if}
					</Link>
				</td>
				<td class="$text-center">
					{#if quantitySelector}
						<Select
							options={range(0, 37)}
							values={range(0, 37)}
							value={quantity}
							disabled={readOnly}
							on:change={event => update(product.id, event)} />
					{:else}
						{quantity}
					{/if}
				</td>
				<td class="$text-right">
					{total.formatted}
				</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr aria-hidden="true">
			<td colspan="3"><hr class="$m-0" /></td>
		</tr>
		{#if supplementalCost}
			<tr>
				<td colspan="2" class="$text-right $font-bold">{supplementalCost.description}:</td>
				<td class="$text-right">{supplementalCost.formatted}</td>
			</tr>
		{/if}
		{#if shipping}
			<tr>
				<td colspan="2" class="$text-right $font-bold">Versand:</td>
				<td class="$text-right">{shipping.price.formatted}</td>
			</tr>
		{/if}
		<tr>
			<td colspan="2" class="$text-right $font-bold"
				>Gesamt:
				<span class="$font-small $font-italic">(inkl. MwSt.)</span></td>
			<td class="$text-right $font-bold $decoration-double-underline">{total.formatted}</td>
		</tr>
	</tfoot>
</table>

<style lang="scss">
	.XioniShopCartTable {
		:global(.Select) {
			max-width: 4rem;
		}

		:global(.Select__input) {
			text-align: center;
		}
	}
</style>
