import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import { XIONI_API_URL } from '$lib/boilerplate/constants'
import type { XioniAlbum, XioniGallery } from './gallery.types'

export default (fetchFn: typeof fetch = fetch) => {
	const fetchJSON = FetchJSON(fetchFn)

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	async function get(module: number) {
		const { ok, data: gallery } = await fetchJSON([XIONI_API_URL, 'gallery', module])

		if (!ok) return

		return gallery as XioniGallery
	}

	/**
	 * Get a single Album
	 *
	 * @param id Album id
	 * @returns Album
	 */

	async function getAlbum(id: number) {
		const { ok, data: album } = await fetchJSON([XIONI_API_URL, 'gallery/album', id])

		if (!ok) return

		return album as XioniAlbum
	}

	return {
		get,
		getAlbum
	}
}
