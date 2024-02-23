import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMS, XioniCMSData } from '../XioniCMS.types'

export default function useMenuCard(fetchFn: typeof fetch = fetch) {
	const fetchJSON = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function getMenuCard(module: number): Promise<XioniCMSData<XioniCMS.MenuCard>> {
		const context = { emitter: 'getMenuCard' }

		const response = await fetchJSON(['cms/menu-card', module])

		if (response.status === 'success') {
			const data = response.data as XioniCMS.MenuCard

			event.emit('loaded', data, context)
			event.emit('finally', context)

			return [data, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	return {
		getMenuCard,
		$event: event
	}
}

export const getMenuCard = useMenuCard().getMenuCard
