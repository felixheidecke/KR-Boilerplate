import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import { XIONI_API_URL } from '$lib/boilerplate/constants'
import type { XioniAlbum, XioniGallery } from './galleries.types'
import type { XioniResponse } from './types'
import { FetchResponseStatus } from '../fetch-json/types'

export default function XioniGallery(fetchFn: typeof fetch = fetch) {
	const fetchJSON = FetchJSON(fetchFn)

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	async function getGallery(module: number): Promise<XioniResponse<XioniGallery>> {
		const response = await fetchJSON([XIONI_API_URL, 'cms/gallery', module])

		return response.status === FetchResponseStatus.SUCCESS
			? [response.data, undefined]
			: [undefined, response]
	}

	/**
	 * Get a single Album
	 *
	 * @param id Album id
	 * @returns Album
	 */

	async function getAlbum(id: number): Promise<XioniResponse<XioniAlbum>> {
		const response = await fetchJSON([XIONI_API_URL, 'cms/gallery/album', id])

		return response.status === FetchResponseStatus.SUCCESS
			? [response.data, undefined]
			: [undefined, response]
	}

	return {
		getGallery,
		getAlbum
	}
}

export const getGallery = XioniGallery().getGallery

export const getAlbum = XioniGallery().getAlbum
