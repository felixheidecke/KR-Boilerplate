export type XioniShopProductProps = {
	product: XioniShop.Product
	baseName?: string
	basePath?: string

	class?: string

	onAddToCart?: (product: XioniShop.Product) => void
}
