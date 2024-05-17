import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { products, groups } from '../../shop.api'

const { getProduct } = products
const { getGroupByProductId } = groups

export const load = async function ({ params }) {
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
