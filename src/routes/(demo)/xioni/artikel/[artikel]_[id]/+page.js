import xioniArticle from '$lib/boilerplate/libraries/xioni/article'

export const prerender = false
export const load = async ({ fetch, params }) => ({
	article: await xioniArticle(fetch).getOne(params.id)
})
