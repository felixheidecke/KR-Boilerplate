import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMS, XioniCMSData } from '../XioniCMS.types'

export function useGallery(fetchFn: typeof fetch = fetch) {
	const fetchJSON = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	async function getGallery(module: number): Promise<XioniCMSData<XioniCMS.Gallery>> {
		const context = { emitter: 'getGallery' }

		const response = await fetchJSON(['cms/gallery', module])

		if (response.status === 'success') {
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

	async function getAlbum(module: number, id: number): Promise<XioniCMSData<XioniCMS.Album>> {
		const context = { emitter: 'getAlbum' }

		const response = await fetchJSON(['cms/gallery', module, id])

		if (response.status === 'success') {
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

export const getGallery = useGallery().getGallery

export const getAlbum = useGallery().getAlbum
