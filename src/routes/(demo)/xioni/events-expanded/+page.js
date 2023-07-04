import XioniEvents from '$lib/boilerplate/libraries/xioni/events'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
	const { getEvents } = XioniEvents(fetch)
	const { data, success } = await getEvents(1289, {
		endsAfter: new Date()
	})

	if (!success) {
		throw error(data.statusCode, data.message)
	}

	return {
		events: data
	}
}
