import { XIONI_API_URL } from '$lib/boilerplate/constants'
import fetchJson from '$lib/boilerplate/libraries/fetch-json'
import type { XioniMenuCard } from './menuCard.types'

export default (fetchFn: typeof fetch = fetch) => {
	const fetchJSON = fetchJson(fetchFn)
	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function get(module: number) {
		const response = await fetchJSON([XIONI_API_URL, 'menu-card', module])

		return response.data as XioniMenuCard
	}

	return {
		get
	}
}
