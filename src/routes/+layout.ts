export const prerender = true
export const ssr = false
export const trailingSlash = 'always'

export const load = async function () {
	return {
		layout: 'website'
	}
}
