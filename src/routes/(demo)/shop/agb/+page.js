import MakeShopInfo from '$lib/boilerplate/libraries/xioni-shop/info'

export const load = async function ({ fetch, parent }) {
	const { module } = await parent()
	const { get } = MakeShopInfo(module, fetch)

	return {
		info: await get()
	}
}
