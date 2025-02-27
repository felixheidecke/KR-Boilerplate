import { productsApi } from '../shop.api'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

export const prerender = false
export const ssr = false

export async function load() {
	const getProducts = productsApi.getProducts({ frontpage: true })

	return {
		products: await xioniLoader(getProducts)
	}
}
