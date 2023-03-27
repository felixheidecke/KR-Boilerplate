import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

export const prerender = false

export const load = async ({ fetch, params }) => ({
	event: await XioniEventApi(fetch).getOne(params.id)
})
