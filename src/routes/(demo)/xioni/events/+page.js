import XioniEventApi from '$lib/boilerplate/libraries/xioni/event'

export const load = async ({ fetch }) => ({
	events: await XioniEventApi(fetch).getMany(1289, { endsAfter: new Date() })
})
