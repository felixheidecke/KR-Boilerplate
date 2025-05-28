import { dev } from '$app/environment'

export async function fetchWithErrorHandling<T>(
	fetchFn: () => Promise<{ data?: T; error?: { message: string }; response: Response }>
): Promise<T> {
	const { data, error } = await fetchFn()

	if (error || !data) {
		if (dev) {
			console.error(error)
		}

		throw error
	}

	return data
}
