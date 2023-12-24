import Shop from '../ShopApi'
import type { PageLoad } from './$types'
import type { XioniShop } from '$lib/boilerplate/xioni/shop/types'

export const load: PageLoad = async () => {
	const info = await Shop.info.getInfo()

	return {
		info: info[1] as unknown as XioniShop.Info
	}
}
