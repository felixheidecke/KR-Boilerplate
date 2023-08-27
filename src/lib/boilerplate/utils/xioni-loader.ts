import { error as svelteError } from '@sveltejs/kit'
import type { XioniResponse } from '../libraries/xioni/types'

export default async function xioniLoader(xioniResponse: Promise<XioniResponse<unknown>>) {
	const [error, data] = await xioniResponse

	if (error) {
		throw svelteError(error.statusCode, error.message)
	}

	return data
}
