import XioniGallery from '$lib/boilerplate/libraries/xioni/galleries'
import { error } from '@sveltejs/kit'

export const load = async ({ params, fetch }) => {
	const { getAlbum } = XioniGallery(fetch)
	const { data, success } = await getAlbum(params.id)

	if (!success) {
		throw error(data.statusCode, data.message)
	}

	return {
		gallery: data
	}
}

export const prerender = false
