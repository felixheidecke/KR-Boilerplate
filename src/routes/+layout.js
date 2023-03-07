import stammdaten from '$lib/stammdaten'

export const load = ({ url }) => {
	return {
		url,
		stammdaten
	}
}

export const prerender = true
