import { FetchResponseStatus } from '../../../utils/fetch-json/types'
import { XIONI_API_URL } from '$lib/boilerplate/constants'
import { XioniFetch } from '../../xioni-fetch'
import EventEmitter from 'eventemitter3'

import type { XioniCMS, XioniResponse } from '../types'
import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'

export default function XioniMenuCard(fetchFn: typeof fetch = fetch) {
	const fetchJSON = XioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get a Menu Card
	 *
	 * @param module Module id
	 * @returns Menu Card
	 */

	async function getMenuCard(module: number): Promise<XioniResponse<XioniCMS.MenuCard>> {
		const context = { emitter: 'getMenuCard' }

		event.emit('loading', context)

		const response = await fetchJSON([XIONI_API_URL, 'cms/menu-card', module])

		if (response.status === FetchResponseStatus.SUCCESS) {
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

export const getMenuCard = XioniMenuCard().getMenuCard
