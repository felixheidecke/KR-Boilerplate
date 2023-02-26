import xioniEventsApi from '$lib/boilerplate/libraries/xioni/event'

export const load = async ({ fetch, params }) => ({
	event: await xioniEventsApi(fetch).getOne(params.id)
})

export const prerender = false
