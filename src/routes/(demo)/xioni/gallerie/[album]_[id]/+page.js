import XioniGalleryApi from '$lib/boilerplate/libraries/xioni/gallery'

export const prerender = false
export const load = async ({ params, fetch }) => ({
	album: await XioniGalleryApi(fetch).getAlbum(params.id)
})
