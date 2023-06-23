import type { RequestHandler } from '@sveltejs/kit'
import pkg from '$lib/../../package.json'

export const prerender = true
export const GET = function () {
	const data = {
		name: pkg.name,
		version: pkg.version,
		build: new Date().toString()
	}
	const response = new Response(JSON.stringify(data))

	response.headers.set('content-type', 'application/json')

	return response
} satisfies RequestHandler
