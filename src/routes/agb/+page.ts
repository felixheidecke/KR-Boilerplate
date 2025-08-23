import { useInfo } from '$lib/boilerplate/xioni/shop/Info'
import xioniLoader from '$lib/boilerplate/xioni/utils/xioniLoader'
import type { Load } from '@sveltejs/kit'

export const prerender = true

export const load: Load = async () => {
	const getInfos = useInfo().getInfos()

	return {
		infos: await xioniLoader(getInfos)
	}
}
