import type { XioniShopProduct, XioniShopCategory } from './products.types'

export function makeProductLink(product: XioniShopProduct) {
	return `/shop/${product.slug}-$p${product.id}`
}

export function makeCategoryLink(category: XioniShopCategory) {
	return `/shop/${category.slug}-$c${category.id}`
}
