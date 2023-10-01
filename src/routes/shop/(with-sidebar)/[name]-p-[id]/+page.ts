import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import { productsApi as productsApi, groupsApi } from '../../shop.api'

const { getProduct } = productsApi
const { getGroupByProductId } = groupsApi

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
