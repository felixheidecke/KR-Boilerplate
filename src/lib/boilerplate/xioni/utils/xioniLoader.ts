import { error as svelteError } from '@sveltejs/kit'

import type { XioniFetchErrorResponse } from './xioniFetch'

export default async function xioniLoader<T>(xioniRequest: Promise<T>) {
	try {
		return await xioniRequest
	} catch (e) {
		const error = e as XioniFetchErrorResponse

		throw svelteError(error.statusCode, error.data.message)
	}
}
