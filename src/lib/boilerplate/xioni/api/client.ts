import appConfig from '$lib/app.config'
import ky from 'ky'

export function createClient() {
	const apiKey = appConfig.shopApiKey

	return ky.create({
		headers: {
			accept: 'application/json',
			'api-key': apiKey
		}
	})
}

export function createUrl(path: string, { query }: { query?: Record<string, any> } = {}): URL {
	const url = new URL('/v5/shop/' + path, appConfig.apiBaseUrl)

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			if (value === undefined) return

			url.searchParams.append(key, String(value))
		})
	}

	return url
}
