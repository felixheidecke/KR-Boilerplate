import { useProducts } from '$lib/boilerplate/xioni/shop/Products'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import type { Load } from '@sveltejs/kit'

export const load: Load = async () => {
	const getProducts = useProducts().getProducts({ frontpage: true })

	return {
		products: await xioniLoader(getProducts)
	}
}
