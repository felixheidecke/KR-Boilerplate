<script lang="ts">
	import classnames from 'classnames'
	import { range } from 'lodash-es'
	import { onMount } from 'svelte'

	// Shop3
	import { cart } from '$lib/boilerplate/libraries/xioni/shop3/'

	// Components
	import LoadSpinner from '../Auxiliary/LoadSpinner.svelte'

	// --- Data --------------------------------------------------------------------------------------

	const CART = cart.store

	const baseName = $$props['ex-class'] || 'Shop3Cart'
	$: className = classnames(baseName, $$props.class)

	// --- Methods -----------------------------------------------------------------------------------
	function handleUpdateQuantity({ target }: any, id: number) {
		cart.api.updateQuantity(target.value, id).then(cart.store.set)
	}
</script>

<div class={className}>
	{#if $CART.products.length}
		<table class="{baseName}__table">
			<thead class="$font-bold">
				<tr>
					<th class="$px-1/2 $text-left">Anzahl</th>
					<th class="$px-1/2 $text-left">Preis</th>
					<th class="$px-1/2 $text-left">Beschreibung</th>
					<th class="$pl-1/2 $text-right">Brutto</th>
				</tr>
			</thead>
			<tbody>
				{#each $CART.products as { id, name, price, quantity, total }}
					<tr>
						<td class="$px-1/2">
							<select
								class="{baseName}__update-quantity-input"
								on:change={el => handleUpdateQuantity(el, id)}>
								{#each range(100) as value}
									<option {value} selected={value === quantity}>{value}</option>
								{/each}
							</select>
						</td>
						<td class="$px-1/2">{price.formatted}</td>
						<td class="$px-1/2">{name}</td>
						<td class="$pl-1/2 $text-right">{total.formatted}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				{#if $CART.additional}
					<tr class="$text-right">
						<td colspan="3">{$CART.additional.title}:</td>
						<td>
							{$CART.additional.formatted}
						</td>
					</tr>
				{/if}
				{#if $CART.shipping}
					<tr class="$text-right">
						<td colspan="3">Versandkosten:</td>
						<td>
							{$CART.shipping.formatted}
						</td>
					</tr>
				{/if}
				<tr class="$text-right">
					<td colspan="3" class="$font-bold">Gesamtpreis:</td>
					<td class="$underline $font-bold">
						{$CART.total.formatted}
					</td>
				</tr>
			</tfoot>
		</table>
	{:else}
		<div class="{baseName}__no-items">Es befinden sich keine Artikel im Warenkorb</div>
	{/if}
</div>

<style>
	:where(.Shop3Cart__table) {
		width: 100%;
		display: table;
		border-collapse: collapse;
		border-spacing: 0;
	}

	:where(.Shop3Cart__table thead) {
		border-bottom: 1px solid;
	}

	:where(.Shop3Cart__table thead th) {
		padding-bottom: 1rem;
	}

	:where(.Shop3Cart__table tbody td) {
		padding-top: 1rem;
		vertical-align: baseline;
	}

	:where(.Shop3Cart__table tbody tr:last-child td) {
		padding-bottom: 1rem;
	}

	:where(.Shop3Cart__table tfoot) {
		border-top: 1px solid;
	}

	:where(.Shop3Cart__table tfoot td) {
		padding-top: 1rem;
	}

	:where(.Shop3Cart__update-quantity-input) {
		padding: 0 0.25rem 0 0;
		border: 0 none;
		font-size: 1rem;
		outline: none;
		width: 3rem;
		/* -webkit-appearance: none;
    -moz-appearance: textfield; */
		cursor: pointer;
		border-radius: 0.25rem;
		text-align: center;
	}

	/* .Shop3Cart__update-quantity-input::-webkit-outer-spin-button,
  .Shop3Cart__update-quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    padding: 0;
  } */
</style>
