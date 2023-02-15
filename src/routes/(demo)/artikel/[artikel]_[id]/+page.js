import xioniArticle from '$lib/boilerplate/libraries/xioni/article'

export const load = async ({ fetch, params }) => ({
	article: await xioniArticle(fetch).getOne(params.id)
})

export const prerender = false
