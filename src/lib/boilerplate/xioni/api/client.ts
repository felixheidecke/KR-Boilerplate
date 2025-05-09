import createOpenApiClient, { type ClientOptions } from 'openapi-fetch'
import appConfig from '$lib/app.config'
import type { paths } from './api'

export default function createClient(clientOptions?: ClientOptions) {
	return createOpenApiClient<paths>({
		baseUrl: 'https://api.klickrhein.de/v6',
		...clientOptions,
		headers: {
			accept: 'application/json',
			'api-key': appConfig.krApiKey,
			...clientOptions?.headers
		}
	})
}

// export async function fetchWithErrorHandling<T>(
// 	fetchFn: () => Promise<{ data?: T; error?: ErrorResponse; response: Response }>
// ): Promise<FetchWithErrorHandlingResponse<T>> {
// 	try {
// 		const { data, error, response } = await fetchFn()

// 		if (error || !response.ok) {
// 			if (import.meta.env.DEV) {
// 				console.error(error)
// 			}

// 			return {
// 				error: {
// 					code: error?.code || response.status,
// 					message: error?.message || response.statusText,
// 					details: error?.details
// 				}
// 			}
// 		}

// 		return data ? { data } : undefined
// 	} catch (error) {
// 		if (import.meta.env.DEV) {
// 			console.error(error)
// 		}

// 		return {
// 			error: {
// 				code: 500,
// 				message: (error as Error).message
// 			}
// 		}
// 	}
// }

// type ErrorResponse = {
// 	code?: number
// 	message?: string
// 	details?: {
// 		[key: string]: string[]
// 	}
// }

// type FetchWithErrorHandlingResponse<T> =
// 	| {
// 			data: T
// 			error?: undefined
// 	  }
// 	| {
// 			error: ErrorResponse
// 			data?: undefined
// 	  }
