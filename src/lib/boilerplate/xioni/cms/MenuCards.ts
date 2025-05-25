import { ApiPaths } from '../api/api.d'
import { dev } from '$app/environment'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'
import type { XioniCMS } from '../types'
import { fetchWithErrorHandling } from '../utils/fetchWithErrorResponse'

// --- Factory -------------------------------------------------------------------------------------

export default function useMenuCard(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function getMenuCard(moduleId: number): Promise<{
		menuCard: XioniCMS.MenuCard
	}> {
		const data = await fetchWithErrorHandling(() =>
			client.GET(ApiPaths.getMenuCard, {
				params: {
					path: { moduleId }
				}
			})
		)

		// Workaround, weil data.menuCard laut Specs auch undefined sein kann
		// es in der Realität aber immer ein Objekt ist
		return { menuCard: data.menuCard as XioniCMS.MenuCard }
	}

	return {
		getMenuCard
	}
}

export const getMenuCard = useMenuCard().getMenuCard
