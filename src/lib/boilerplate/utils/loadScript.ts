export default function loadScript(url: URL | string) {
	return new Promise(function (resolve, reject) {
		url = url.toString()
		const detectedScript = document.querySelector("script[src='" + url + "']")

		// Detect wether the script was already added
		if (detectedScript) {
			setTimeout(resolve)
			return
		}

		const script = document.createElement('script')

		script.addEventListener(
			'load',
			function () {
				setTimeout(resolve, 50)
			},
			{ once: true }
		)

		script.addEventListener(
			'error',
			function () {
				console.error('Integration of external script failed')
				reject()
			},
			{ once: true }
		)

		script.setAttribute('src', url)
		script.setAttribute('id', '_' + Math.random().toString(36).substring(2))

		document.head.appendChild(script)
	})
}
