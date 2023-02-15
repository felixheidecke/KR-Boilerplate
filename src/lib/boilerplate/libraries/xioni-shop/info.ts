import { XIONI_API_URL } from '../../constants'
import fetchJson from '../fetch-json'
import type { XioniShopInfo } from './info.types'

export default (module: number, fetchFn: typeof fetch = fetch) => {
	const fetchJSON = fetchJson(fetchFn)
	/**
	 * Get all infos about the including shipping charges
	 *
	 * @returns Informations
	 */

	async function get() {
		const { ok, data: order } = await fetchJSON([XIONI_API_URL, 'shop', module, 'info'])

		if (!ok) return

		return order as XioniShopInfo
	}

	return {
		get
	}
}
