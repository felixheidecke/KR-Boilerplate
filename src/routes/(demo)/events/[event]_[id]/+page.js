import EventApi from '$lib/boilerplate/libraries/xioni/event'

/*

  getOne() Parameter:
  *******************

  "eventId"?  [Number|String]

*/

export const load = async ({ fetch, params }) => {
	const getEvent = EventApi(fetch).getOne

	return {
		event: await getEvent(params.id)
	}
}

export const prerender = false
