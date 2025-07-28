import { useProducts } from '$lib/boilerplate/xioni/shop/Products'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'

export async function load() {
	const getProducts = useProducts().getProducts({ frontpage: true })

	return {
		products: await xioniLoader(getProducts)
	}
}
