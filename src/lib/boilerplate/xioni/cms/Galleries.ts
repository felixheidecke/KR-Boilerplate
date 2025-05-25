import { ApiPaths } from '../api/api.d'
import { dev } from '$app/environment'
import { fetchWithErrorHandling } from '../utils/fetchWithErrorResponse'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'
import type { XioniCMS } from '../types'

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
			totalCount?: number
		}
	}> {
		return fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getAlbums, {
				params: {
					path: { moduleId }
				}
			})
		)
	}

	/**
	 * Get a single Album
	 *
	 * @param id Album id
	 * @returns Album
	 */

	async function getAlbum(
		moduleId: number,
		albumId: number
	): Promise<{
		album: XioniCMS.Album
	}> {
		return fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getAlbum, {
				params: {
					path: {
						moduleId,
						albumId
					}
				}
			})
		)
	}

	return {
		getGallery,
		getAlbum
	}
}

export const getGallery = useGallery().getGallery
export const getAlbum = useGallery().getAlbum
