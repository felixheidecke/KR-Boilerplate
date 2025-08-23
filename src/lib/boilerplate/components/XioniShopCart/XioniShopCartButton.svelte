<script lang="ts">
	import './XioniShopCartButton.scss'

	import { Button } from '../Button'
	import { CART } from '$lib/stores'
	import classnames from 'classnames'
	import makeBEM from '$lib/boilerplate/utils/makeBem'
	import type { XioniShopCartButtonProps } from './XioniShopCartButton'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		baseName = 'XioniShopCartButton',
		class: classProp,
		onClick,
		...restProps
	}: XioniShopCartButtonProps = $props()

	// --- [ Setup ] ---------------------------------------------------------------------------------

	const { element, modifier } = makeBEM(baseName)
	const hasItems = $derived(!!$CART.products.length)
	const classNames = $derived(classnames(classProp, hasItems && modifier('has-items')))
</script>

<Button to="/checkout" {baseName} fontello="basket" {...restProps} class={classNames}
	>Warenkorb
	{#if !!$CART.products.length}
		<span class={element('indicator')}>{$CART.products.length}</span>
	{/if}
</Button>
