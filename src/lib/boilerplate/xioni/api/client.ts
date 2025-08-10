import appConfig from '$lib/app.config'
import ky from 'ky'
import { pickBy } from 'lodash-es'

export function createClient() {
	const apiKey = appConfig.shopApiKey

	return ky.create({
		headers: {
			accept: 'application/json',
			'api-key': apiKey
		}
	})
}

export function createShopUrl(
	path: string,
	{ query }: { query?: Record<string, any> } = {}
): string {
	const url = `/api/shop/${appConfig.shopModuleID}/${path}`

	if (query) {
		const searchParams = new URLSearchParams(pickBy(query, value => value !== undefined)).toString()

		return `${url}?${searchParams}`
	}

	return url
}
