import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

import type { XioniCMS } from '../types'

// --- Factory -------------------------------------------------------------------------------------

export default function useGallery(fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	function getGallery(module: number): Promise<XioniCMS.Gallery> {
		const context = { emitter: 'getGallery' }

		return new Promise(async (resolve, reject) => {
			const response = await fetch(['cms/gallery', module])

			if (response.status === 'success') {
				resolve(response.data as XioniCMS.Gallery)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	/**
	 * Get a single Album
	 *
	 * @param id Album id
	 * @returns Album
	 */

	async function getAlbum(module: number, id: number): Promise<XioniCMS.Album> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['cms/gallery', module, id])

			if (response.status === 'success') {
				resolve(response.data as XioniCMS.Album)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		getGallery,
		getAlbum
	}
}

export const getGallery = useGallery().getGallery
export const getAlbum = useGallery().getAlbum
