import type { RequestHandler } from '@sveltejs/kit'
import pkg from '$lib/../../package.json'
import { LOCALE } from '$lib/boilerplate/constants'

export const GET = function () {
	const data = {
		name: pkg.name,
		version: pkg.version,
		build: new Date().toLocaleString(LOCALE)
	}
	const response = new Response(JSON.stringify(data))

	response.headers.set('content-type', 'application/json')
	response.headers.set('cache-control', 'max-age=60')

	return response
} satisfies RequestHandler
