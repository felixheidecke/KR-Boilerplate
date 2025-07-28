import { useGroups } from '$lib/boilerplate/xioni/shop/Groups.js'
import { useProducts } from '$lib/boilerplate/xioni/shop/Products.js'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader.js'

const { getGroup } = useGroups()
const { getProductsByGroup } = useProducts()

export async function load({ params }) {
	const id = +params.id
	const [group, products] = await Promise.all([
		xioniLoader(getGroup(id)),
		xioniLoader(getProductsByGroup(id, { recursive: true }))
	])

	return {
		group,
		products
	}
}
