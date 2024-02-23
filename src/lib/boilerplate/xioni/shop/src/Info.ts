import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniShop, XioniShopData } from '../XioniShop.types'
import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { Xioni } from '../../Xioni.types'

export function useInfo(module: number, fetchFn: typeof fetch = fetch) {
	const fetch = xioniFetch(fetchFn)
	const event = new EventEmitter()

	/**
	 * Get all infos about the including shipping charges
	 *
	 * @returns Informations
	 */

	async function getInfo(): Promise<XioniShopData<XioniShop.Info>> {
		const context: Xioni.EventContext = { emitter: 'getInfo' }

		event.emit('loading-toggle', true, context)

		const response = await fetch(['shop', module, 'info'])

		if (response.status === 'success') {
			const data = response.data as XioniShop.Info

			event.emit('success', data, context)
			event.emit('loading-toggle', false, context)

			return [data, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('loading-toggle', false, context)

			return [undefined, error]
		}
	}

	return {
		getInfo,
		$event: event
	}
}
