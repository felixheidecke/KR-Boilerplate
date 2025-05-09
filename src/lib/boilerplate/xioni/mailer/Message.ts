import { ApiPaths, type SchemaMailerMessageRequestBody } from '../api/api'
import { dev } from '$app/environment'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'

// --- [ Factory ] ---------------------------------------------------------------------------------

// export function useMessage(clientOptions?: ClientOptions) {
// 	const client = createClient(clientOptions)

// 	async function send(
// 		to: number | string,
// 		subject: string,
// 		required: string[] = [],
// 		body: {
// 			[key: string]: FormDataEntryValue
// 		},
// 		config: {
// 			attachBodyAsCSV?: boolean
// 		} = {}
// 	): Promise<boolean> {
// 		try {
// 			await client.POST(ApiPaths.sendMessage, {
// 				data: {
// 					body,
// 					config: {
// 						to,
// 						subject,
// 						required: required.join()
// 					}
// 				},
// 				params: objectFilterBy(
// 					{
// 						attachBodyAsCSV: config.attachBodyAsCSV || undefined
// 					},
// 					val => !isUndefined(val)
// 				)
// 			})

// 			return true
// 		} catch (error) {
// 			throw error
// 		}
// 	}

// 	return {
// 		send
// 	}
// }

export function useMailer(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	async function send(data: SchemaMailerMessageRequestBody): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			client
				.POST(ApiPaths.sendMessage, { data })
				.catch(error => {
					if (dev) console.error(error)

					reject({
						code: error.status,
						...error.response.data
					})
				})
				.then(() => resolve(true))
		})
	}

	return {
		send
	}
}
