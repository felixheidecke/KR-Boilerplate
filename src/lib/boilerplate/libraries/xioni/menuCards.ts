import fetchJson from '$lib/boilerplate/libraries/fetch-json'
import { xioniConfig } from '$lib/config'
import { FetchResponseStatus } from '../fetch-json/types'
import type { XioniMenuCard } from './menuCards.types'
import type { XioniResponse } from './types'

export default function XioniMenuCard(fetchFn: typeof fetch = fetch) {
	const fetchJSON = fetchJson(fetchFn)
	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function getMenuCard(module: number): Promise<XioniResponse<XioniMenuCard>> {
		const { status, data } = await fetchJSON([xioniConfig.apiPath, 'menu-card', module])

		return status === FetchResponseStatus.SUCCESS ? [undefined, data] : [data, undefined]
	}

	return {
		getMenuCard
	}
}

export const getMenuCard = XioniMenuCard().getMenuCard
