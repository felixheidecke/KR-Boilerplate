import { dev } from '$app/environment'
import Axios from 'axios'
import config from '$lib/app.config'
import type { XioniCMS } from '../types'

// --- Factory -------------------------------------------------------------------------------------

export default function useMenuCard(fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function getMenuCard(module: number): Promise<{
		menuCard: XioniCMS.MenuCard
	}> {
		try {
			const { data } = await axios.get(`cms/menu-card/${module}`)

			return data
		} catch (error) {
			if (dev) console.error(error)

			throw error
		}
	}

	return {
		getMenuCard
	}
}

export const getMenuCard = useMenuCard().getMenuCard
