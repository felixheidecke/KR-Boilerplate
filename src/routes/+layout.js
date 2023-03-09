import stammdaten from '$lib/stammdaten'

export const prerender = true
export const load = ({ url }) => {
	return {
		url,
		stammdaten
	}
}
