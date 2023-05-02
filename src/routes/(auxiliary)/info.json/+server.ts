import type { RequestHandler } from '@sveltejs/kit'
import pkg from '$lib/../../package.json'
import { LOCALE } from '$lib/boilerplate/constants'

export const prerender = true
export const GET = function () {
	const data = {
		name: pkg.name,
		version: pkg.version,
		build: new Date().toLocaleString(LOCALE, {
			month: '2-digit',
			day: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}
	const response = new Response(JSON.stringify(data))

	response.headers.set('content-type', 'application/json')

	return response
} satisfies RequestHandler
