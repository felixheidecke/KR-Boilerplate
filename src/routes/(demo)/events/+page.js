import xioniEventsApi from '$lib/boilerplate/libraries/xioni/event'

export const load = async ({ fetch }) => ({
	events: await xioniEventsApi(fetch).getAll(1289, {
		endsAfter: 'today'
	})
})
