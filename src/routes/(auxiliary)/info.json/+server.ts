import type { RequestHandler } from '@sveltejs/kit'
import pkg from '$lib/../../package.json'
import { LOCALE } from '$lib/boilerplate/constants'

export const prerender = true
export const GET = function () {
	const data = {
		name: pkg.name,
		version: pkg.version,
		build: new Date().toLocaleString(LOCALE)
	}
	const response = new Response(JSON.stringify(data))

	response.headers.set('content-type', 'application/json')

	return response
} satisfies RequestHandler
