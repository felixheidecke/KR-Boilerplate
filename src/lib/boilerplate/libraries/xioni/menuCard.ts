import { XIONI_API_URL } from '$lib/boilerplate/constants'
import fetchJson from '$lib/boilerplate/libraries/fetch-json'
import type { XioniMenuCard } from './menuCard.types'

export default function XioniMenuCardApi(fetchFn: typeof fetch = fetch) {
	const fetchJSON = fetchJson(fetchFn)
	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function get(module: number) {
		const { ok, data: menuCard } = await fetchJSON([XIONI_API_URL, 'menu-card', module])

		if (!ok) return null

		return menuCard as XioniMenuCard
	}

	return {
		get
	}
}

export const get = XioniMenuCardApi().get
