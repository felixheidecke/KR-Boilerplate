<script lang="ts">
	// import './XioniShopOrderTable.css'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let cart: XioniShop.Order['cart']
	export let total: XioniShop.Order['total']
	export let shippingCost: XioniShop.Order['shippingCost']
</script>

<table class="XioniShopOrderTable">
	<thead>
		<tr>
			<th>Produkt</th>
			<th>Menge</th>
			<th>Preis</th>
			<th>Gesamt</th>
		</tr>
	</thead>
	<tbody>
		{#each cart || [] as { name, quantity, price, total }}
			<tr>
				<td>{name}</td>
				<td>{quantity}</td>
				<td>{price.formatted}</td>
				<td>{total.formatted}</td>
			</tr>
		{/each}
		{#if shippingCost}
			<tr>
				<td>Versandkosten</td>
				<td colspan="3" class="$text-right">{shippingCost.formatted}</td>
			</tr>
		{/if}
	</tbody>
	<tfoot>
		<tr>
			<td colspan="4">{total.formatted}</td>
		</tr>
	</tfoot>
</table>
