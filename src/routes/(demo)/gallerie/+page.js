import xioniGallery from '$lib/boilerplate/libraries/xioni/gallery'

export const load = ({ fetch }) => ({
	gallery: xioniGallery(fetch).get(1453)
})
