import { error as svelteError } from '@sveltejs/kit'
import type { XioniResponse } from '../libraries/xioni/types'

export default async function xioniLoader(xioniResponse: Promise<XioniResponse>) {
	const [data, error] = await xioniResponse

	if (error && error.statusCode !== 412) {
		throw svelteError(error.statusCode, error.data.message)
	}

	return data
}
