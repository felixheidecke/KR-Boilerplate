import { Info } from '../api'
import type { PageLoad } from './$types'
import type { XioniShop } from '$lib/boilerplate/libraries/xioni-shop/types'
import xioniLoader from '$lib/boilerplate/utils/xioni-loader'

export const load: PageLoad = async () => ({
	info: (await xioniLoader(Info.getInfo())) as XioniShop.Info
})
