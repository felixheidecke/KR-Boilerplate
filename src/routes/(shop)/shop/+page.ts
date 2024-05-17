import { products } from '../shop.api'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

const { getProducts } = products

export const load = async () => ({
	products: await xioniLoader(getProducts({ frontpage: true }))
})

export const prerender = false
export const ssr = false
