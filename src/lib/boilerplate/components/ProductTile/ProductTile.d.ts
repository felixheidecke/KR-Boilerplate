import type { XioniShop } from '$lib/boilerplate/xioni/types'

export type ProductTileProps = {
	class?: string
	baseName?: string

	product: XioniShop.Product
}
