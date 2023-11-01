import EventEmitter from 'eventemitter3'
import { FetchMethods, FetchResponseStatus } from '$lib/boilerplate/utils/fetch-json/types'
import { XioniFetch } from '../../xioni-fetch'

import type { XioniResponse } from '../types'
import type { XioniFetchErrorResponse } from '../../xioni-fetch/types'

export function FormMailFactory(fetchFn: typeof fetch = fetch) {
	const fetchJSON = XioniFetch(fetchFn)
	const event = new EventEmitter()

	async function createFormMail(
		formData: { [k: string]: FormDataEntryValue }[]
	): Promise<XioniResponse<boolean>> {
		const context = { emitter: 'createFormMail' }

		event.emit('creating', context)

		const response = await fetchJSON(['form-mail'], {
			method: FetchMethods.POST,
			data: formData
		})

		if (response.status === FetchResponseStatus.SUCCESS) {
			event.emit('created', true, context)
			event.emit('finally', context)

			return [true, undefined]
		} else {
			const error = response as XioniFetchErrorResponse

			event.emit('error', error, context)
			event.emit('finally', context)

			return [undefined, error]
		}
	}

	return {
		createFormMail,
		$event: event
	}
}
