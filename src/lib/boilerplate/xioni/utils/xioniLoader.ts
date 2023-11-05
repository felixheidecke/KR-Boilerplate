import { error as svelteError } from '@sveltejs/kit'
import type { XioniFetchErrorResponse } from './xioniFetch'

export default async function xioniLoader(
	xioniResponse: Promise<[unknown, undefined] | [undefined, XioniFetchErrorResponse]>
) {
	const [data, error] = await xioniResponse

	if (error && error.statusCode !== 412) {
		throw svelteError(error.statusCode, error.data.message)
	}

	return data
}
