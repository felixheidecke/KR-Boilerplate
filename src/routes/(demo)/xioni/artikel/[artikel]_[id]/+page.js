import XioniArticles from '$lib/boilerplate/libraries/xioni/articles'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch, params }) => {
	const { getArticle } = XioniArticles(fetch)
	const { data, success } = await getArticle(params.id)

	if (!success) {
		throw error(data.statusCode, data.message)
	}

	return {
		article: data
	}
}

export const prerender = false
