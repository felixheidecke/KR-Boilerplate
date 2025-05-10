import { useGroups } from '$lib/boilerplate/xioni/shop/Groups.js'
import { useProducts } from '$lib/boilerplate/xioni/shop/Products.js'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

const { getProduct } = useProducts()
const { getGroupByProductId } = useGroups()

export async function load({ params }) {
	const id = +params.id
	const [product, group] = await Promise.all([
		xioniLoader(getProduct(id)),
		xioniLoader(getGroupByProductId(id))
	])

	return {
		product,
		group
	}
}
