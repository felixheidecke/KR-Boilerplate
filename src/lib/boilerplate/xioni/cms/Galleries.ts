import { dev } from '$app/environment'
import Axios from 'axios'
import config from '$lib/app.config'
import type { XioniCMS } from '../types'

// --- Factory -------------------------------------------------------------------------------------

export default function useGallery(fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	async function getGallery(module: number): Promise<{
		albums: XioniCMS.Gallery
		meta: {
			totalCount: number
		}
	}> {
		try {
			const { data } = await axios.get(`cms/gallery/${module}`)

			return data
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
	}

	/**
	 * Get a single Album
	 *
	 * @param id Album id
	 * @returns Album
	 */

	async function getAlbum(
		module: number,
		id: number
	): Promise<{
		album: XioniCMS.Album
	}> {
		try {
			const { data } = await axios.get(`cms/gallery/${module}/${id}`)

			return data
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
	}

	return {
		getGallery,
		getAlbum
	}
}

export const getGallery = useGallery().getGallery
export const getAlbum = useGallery().getAlbum
