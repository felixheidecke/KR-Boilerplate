export default function (url: string | URL) {
	const pathname = typeof url !== 'string' ? url.pathname : url.trim()

	return (
		pathname.startsWith('https://') || pathname.startsWith('http://') || pathname.endsWith('.pdf')
	)
}
