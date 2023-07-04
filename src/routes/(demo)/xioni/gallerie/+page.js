import XioniGalleries from '$lib/boilerplate/libraries/xioni/galleries'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
	const { getGallery } = XioniGalleries(fetch)
	const { data, success } = await getGallery(1453)

	if (!success) {
		throw error(data.statusCode, data.message)
	}

	return {
		gallery: data
	}
}
