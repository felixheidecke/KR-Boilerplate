import { FetchResponseStatus } from '../../../utils/fetch-json/types'
import { XioniFetch } from '../../xioni-fetch'
import EventEmitter from 'eventemitter3'

import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'
import type { XioniResponse } from '../../xioni-cms/types'
import type { XioniShop } from '../types'

export function InfoFactory(module: number, fetchFn: typeof fetch = fetch) {
	const xioniFetch = XioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get all infos about the including shipping charges
	 *
	 * @returns Informations
	 */

	async function getInfo(): Promise<XioniResponse<XioniShop.Info>> {
		const context = { emitter: 'getInfo' }

		event.emit('loading', context)

		const response = await xioniFetch(['shop', module, 'info'])

		if (response.status === FetchResponseStatus.SUCCESS) {
			const data = response.data as XioniShop.Info

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
		getInfo,
		$event: event
	}
}
