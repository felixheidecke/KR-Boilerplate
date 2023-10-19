import { Info } from '../api'
import type { PageLoad } from './$types'
import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'

export const load: PageLoad = async () => {
	const info = await Info.getInfo()

	return {
		info: info[1] as unknown as XioniShop.Info
	}
}
