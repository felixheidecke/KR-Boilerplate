import EventEmitter from 'eventemitter3'
import { xioniFetch } from '../../utils/xioniFetch'

import type { XioniFetchErrorResponse } from '../../utils/xioniFetch'
import type { XioniCMSData } from '../types'

export function useFormMail(fetchFn: typeof fetch = fetch) {
	const fetchJSON = xioniFetch(fetchFn)
	const event = new EventEmitter()

	async function submit(
		config: { to: number; required: string[]; subject: string },
		formData: { [k: string]: FormDataEntryValue }
	): Promise<XioniCMSData<boolean>> {
		const context = { emitter: 'createFormMail' }

		event.emit('loading', context)
		event.emit('loading-toggle', true, context)

		const response = await fetchJSON(['form-mail'], {
			method: 'POST',
			data: {
				config,
				formData
			}
		})

		if (response.status === 'success') {
			event.emit('success', true, context)
			event.emit('loading-toggle', false, context)

			return [true, undefined]
		} else {
			event.emit('error', response, context)
			event.emit('loading-toggle', false, context)

			return [undefined, response as XioniFetchErrorResponse]
		}
	}

	return {
		submit,
		$event: event
	}
}
