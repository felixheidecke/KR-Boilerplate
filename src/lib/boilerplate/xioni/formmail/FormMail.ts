import { dev } from '$app/environment'
import { isUndefined } from 'lodash-es'
import Axios from 'axios'
import config from '$lib/app.config'
import objectFilterBy from '$lib/boilerplate/utils/objectFilterBy'
import type { XioniApiErrorResponse } from '../types'

// --- [ Factory ] ---------------------------------------------------------------------------------

export function useFormMail(fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

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
		try {
			await axios.post('v5/mailer/message', {
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

			return true
		} catch (error) {
			throw error
		}
	}

	return {
		send
	}
}

export function useFormMail6(fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
	})

	async function send(data: FormData): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			axios
				.post('/mailer/message', data)
				.catch(error => {
					if (dev) console.error(error)

					reject({
						code: error.status,
						...error.response.data
					} satisfies XioniApiErrorResponse['v6'])
				})
				.then(() => resolve(true))
		})
	}

	return {
		send
	}
}

export const sendFormMail = useFormMail6().send
