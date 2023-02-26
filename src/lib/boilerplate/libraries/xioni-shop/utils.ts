import type { XioniShopCategory } from './categories.types'
import type { XioniShopProduct } from './products.types'

export function makeProductLink(basePath: '/shop/', { slug, id }: XioniShopProduct) {
	return basePath + slug + '_p' + id
}

export function makeCategoryLink(basePath: '/shop/', { slug, id }: XioniShopCategory) {
	return basePath + slug + '_k' + id
}
