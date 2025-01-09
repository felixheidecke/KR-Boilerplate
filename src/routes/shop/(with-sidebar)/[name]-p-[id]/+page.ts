import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { productsApi, groupsApi } from '../../shop.api'

const { getProduct } = productsApi
const { getGroupByProductId } = groupsApi

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
