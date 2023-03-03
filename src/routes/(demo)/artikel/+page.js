import xioniArticleApi from '$lib/boilerplate/libraries/xioni/article'

export const load = async ({ fetch }) => ({
	articles: await xioniArticleApi(fetch).getMany(1383)
})
