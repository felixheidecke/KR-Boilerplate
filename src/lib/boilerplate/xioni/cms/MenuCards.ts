import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

import type { XioniCMS } from '../types'

// --- Factory -------------------------------------------------------------------------------------

export default function useMenuCard(fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)

	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function getMenuCard(module: number): Promise<XioniCMS.MenuCard> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(['cms/menu-card', module])

			if (response.status === 'success') {
				resolve(response.data as XioniCMS.MenuCard)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		getMenuCard
	}
}

export const getMenuCard = useMenuCard().getMenuCard
