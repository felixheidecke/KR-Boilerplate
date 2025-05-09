import { dev } from '$app/environment'
import config from '$lib/app.config'
import type { XioniCMS } from '../types'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'
import { ApiPaths } from '../api/api'

// --- Factory -------------------------------------------------------------------------------------

export default function useGallery(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	/**
	 * Get Albums grouped as a Gallery
	 *
	 * @param module Module id
	 * @returns Gallery
	 */

	async function getGallery(moduleId: number): Promise<{
		albums: XioniCMS.Gallery
		meta: {
			totalCount: number
		}
	}> {
		try {
			const { data, error } = await client.GET(ApiPaths.getAlbums, {
				params: {
					path: { moduleId }
				}
			})

			if (error || !data) throw error

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
