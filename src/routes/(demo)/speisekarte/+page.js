import menuCard from '$lib/boilerplate/libraries/xioni/menuCard'

export const load = async ({ fetch }) => ({
	menuCard: await menuCard(fetch).get(831)
})
