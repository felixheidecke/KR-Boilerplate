import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader.js'
import { groups, products } from '../../shop.api'

const { getGroup } = groups
const { getProductsByGroup } = products

export const load = async function ({ params }) {
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
