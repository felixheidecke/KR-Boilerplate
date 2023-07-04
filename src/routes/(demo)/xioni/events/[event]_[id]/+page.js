import XioniEvents from '$lib/boilerplate/libraries/xioni/events'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch, params }) => {
	const { getEvent } = XioniEvents(fetch)
	const { data, success } = await getEvent(params.id)

	if (!success) {
		throw error(data.statusCode, data.message)
	}

	return {
		article: data
	}
}

export const prerender = false
