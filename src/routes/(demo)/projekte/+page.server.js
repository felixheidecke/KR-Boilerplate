import FetchJson from '$lib/boilerplate/libraries/fetch-json'

export const prerender = false
export const load = async ({ fetch }) => {
	const jsonFetch = FetchJson(fetch)

	const pages = await Promise.all(
		[
			'am-elsterbach.de',
			'www.eltviller-vinothek.de',
			'freistaatflaschenhals.de',
			'heidelberg-institute.de',
			'ecokids.education',
			'hotel-neugebauer.de',
			'freundeskreis-brentano-haus.de',
			'basicsandmore.de',
			'hausmeisterservice-mueller.de'
		].map(domain => jsonFetch(['https://', domain, '/info.json']))
	)

	return {
		pages
	}
}
