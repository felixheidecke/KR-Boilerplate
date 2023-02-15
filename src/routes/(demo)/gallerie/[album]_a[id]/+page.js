import XioniGallery from '$lib/boilerplate/libraries/xioni/gallery'

export const load = ({ params, fetch }) => ({
	album: XioniGallery(fetch).getAlbum(params.id)
})

export const prerender = false
