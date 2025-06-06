import { ApiPaths, type SchemaMailerMessageRequestBody } from '../api/api.d'
import { dev } from '$app/environment'
import createClient from '../api/client'
import type { ClientOptions } from 'openapi-fetch'

// --- [ Factory ] ---------------------------------------------------------------------------------

export function useMailer(clientOptions?: ClientOptions) {
	const client = createClient(clientOptions)

	async function send(body: SchemaMailerMessageRequestBody): Promise<boolean> {
		const { error, response } = await client.POST(ApiPaths.sendMessage, { body })

		if (error) {
			const errorResponse = {
				status: response.status,
				messages: error.message,
				details: (error as any).details || null
			}

			if (dev) {
				console.error(errorResponse)
			}

			throw errorResponse
		}

		return true
	}

	return {
		send
	}
}
