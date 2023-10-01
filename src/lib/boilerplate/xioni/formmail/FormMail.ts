import objectFilterBy from '$lib/boilerplate/utils/objectFilterBy'
import { isUndefined } from 'lodash-es'
import { xioniFetch, type XioniFetchErrorResponse } from '../utils/xioniFetch'

export function useFormMail(fetchFn: typeof fetch = fetch) {
	const fetchJSON = xioniFetch(fetchFn)

	async function send(
		to: number | string,
		subject: string,
		required: string[] = [],
		body: {
			[key: string]: FormDataEntryValue
		},
		config: {
			attachBodyAsCSV?: boolean
		} = {}
	): Promise<boolean> {
		const context = { emitter: 'send' }

		return new Promise(async (resolve, reject) => {
			const response = await fetchJSON(['form-mail/send'], {
				method: 'POST',
				data: {
					body,
					config: {
						to,
						subject,
						required: required.join()
					}
				},
				params: objectFilterBy(
					{
						attachBodyAsCSV: config.attachBodyAsCSV || undefined
					},
					val => !isUndefined(val)
				)
			})

			if (response.status === 'success') {
				resolve(true)
			} else {
				reject(response as XioniFetchErrorResponse)
			}
		})
	}

	return {
		send
	}
}
