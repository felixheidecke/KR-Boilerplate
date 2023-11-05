import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMSData } from '../types'

export function FormMailFactory(fetchFn: typeof fetch = fetch) {
	const fetchJSON = xioniFetch(fetchFn)
	const event = new EventEmitter()

	async function createFormMail(
		formData: { [k: string]: FormDataEntryValue }[]
	): Promise<XioniCMSData<boolean>> {
		const context = { emitter: 'createFormMail' }

		event.emit('creating', context)

		const response = await fetchJSON(['form-mail'], {
			method: 'POST',
			data: formData
		})

		if (response.status === 'success') {
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
