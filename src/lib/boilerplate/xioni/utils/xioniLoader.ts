import { dev } from '$app/environment'
import { error as svelteError } from '@sveltejs/kit'
import type { AxiosError } from 'axios'

export default async function xioniLoader<T>(xioniRequest: Promise<T>) {
	try {
		return await xioniRequest
	} catch (error) {
		console.error(error)

		const { status, message } = error as AxiosError

		throw svelteError(status || 500, message || 'Ein unbekannter Fehler ist aufgetreten.')
	}
}
