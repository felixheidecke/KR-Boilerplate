import { ApiPaths, type SchemaMailerMessageRequestBody } from '../api/api.d'
import { dev } from '$app/environment'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'

// --- [ Factory ] ---------------------------------------------------------------------------------

export function useMailer(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	async function send(body: SchemaMailerMessageRequestBody): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			client
				.POST(ApiPaths.sendMessage, { body })
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
