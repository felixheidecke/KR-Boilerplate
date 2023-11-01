import { FetchResponseStatus } from '../../../utils/fetch-json/types'
import { XioniFetch } from '../../xioni-fetch'
import EventEmitter from 'eventemitter3'

import type { XioniCMS, XioniResponse } from '../types'
import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'

export function GalleryFactory(fetchFn: typeof fetch = fetch) {
	const fetchJSON = XioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	async function getGallery(module: number): Promise<XioniResponse<XioniCMS.Gallery>> {
		const context = { emitter: 'getGallery' }

		event.emit('loading', context)

		const response = await fetchJSON(['cms/gallery', module])

		if (response.status === FetchResponseStatus.SUCCESS) {
			const gallery = response.data as XioniCMS.Gallery

			event.emit('loaded', gallery, context)
			event.emit('finally', context)

			return [gallery, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	/**
	 * Get a single Album
	 *
	 * @param id Album id
	 * @returns Album
	 */

	async function getAlbum(id: number): Promise<XioniResponse<XioniCMS.Album>> {
		const context = { emitter: 'getAlbum' }
		event.emit('loading', context)

		const response = await fetchJSON(['cms/album', id])

		if (response.status === FetchResponseStatus.SUCCESS) {
			const album = response.data as XioniCMS.Album

			event.emit('loaded', album, context)
			event.emit('finally', context)

			return [album, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	return {
		getGallery,
		getAlbum,
		$event: event
	}
}

export const getGallery = GalleryFactory().getGallery

export const getAlbum = GalleryFactory().getAlbum
