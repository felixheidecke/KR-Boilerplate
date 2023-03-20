import XioniGalleryApi from '$lib/boilerplate/libraries/xioni/gallery'

export const load = ({ fetch }) => ({
	gallery: XioniGalleryApi(fetch).get(1453)
})
