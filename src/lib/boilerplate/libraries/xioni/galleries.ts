import FetchJSON from '$lib/boilerplate/libraries/fetch-json'
import type { XioniAlbum, XioniGallery } from './galleries.types'
import type { XioniResponse } from './types'
import { FetchResponseStatus } from '../fetch-json/types'
import { xioniConfig } from '$lib/config'

export default function XioniGallery(fetchFn: typeof fetch = fetch) {
	const fetchJSON = FetchJSON(fetchFn)

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	async function getGallery(module: number): Promise<XioniResponse<XioniGallery>> {
		const { status, data } = await fetchJSON([xioniConfig.apiPath, 'gallery', module])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	/**
	 * Get a single Album
	 *
	 * @param id Album id
	 * @returns Album
	 */

	async function getAlbum(id: number): Promise<XioniResponse<XioniAlbum>> {
		const { status, data } = await fetchJSON([xioniConfig.apiPath, 'gallery/album', id])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return {
		getGallery,
		getAlbum
	}
}

export const getGallery = XioniGallery().getGallery

export const getAlbum = XioniGallery().getAlbum
