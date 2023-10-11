import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader.js'
import { groupsApi, productsApi as productsApi } from '../../shop.api'

const { getGroup } = groupsApi
const { getProductsByGroup } = productsApi

export const load = async function ({ params }) {
	console.log('params', params)

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
