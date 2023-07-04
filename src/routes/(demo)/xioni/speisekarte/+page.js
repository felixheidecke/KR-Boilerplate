import XioniMenuCards from '$lib/boilerplate/libraries/xioni/menuCards'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
	const { getMenuCard } = XioniMenuCards(fetch)
	const { data, success } = await getMenuCard(1540)

	if (!success) {
		throw error(data.statusCode, data.message)
	}

	return {
		menuCard: data
	}
}
