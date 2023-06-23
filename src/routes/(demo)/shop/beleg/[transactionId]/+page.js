import MakeShopOrder from '$lib/boilerplate/libraries/xioni-shop/order'

export const load = async function ({ params, fetch, parent }) {
	const { module } = await parent()
	const { getReciept } = MakeShopOrder(module, fetch)

	return {
		reciept: await getReciept(params.transactionId)
	}
}
