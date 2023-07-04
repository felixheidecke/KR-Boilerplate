import XioniArticles from '$lib/boilerplate/libraries/xioni/articles'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
	const { getArticles } = XioniArticles(fetch)
	const { data, success } = await getArticles(1383)

	if (!success) {
		throw error(data.statusCode, data.message)
	}

	return {
		articles: data
	}
}
