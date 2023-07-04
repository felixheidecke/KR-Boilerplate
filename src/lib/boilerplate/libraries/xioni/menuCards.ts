import { XIONI_API_URL } from '$lib/boilerplate/constants'
import fetchJson from '$lib/boilerplate/libraries/fetch-json'
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
		const { status, data } = await fetchJSON([XIONI_API_URL, 'menu-card', module])

		return {
			success: status === FetchResponseStatus.SUCCESS,
			data
		}
	}

	return {
		getMenuCard
	}
}

export const getMenuCard = XioniMenuCard().getMenuCard
