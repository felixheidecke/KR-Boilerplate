export default function waitForIt(provider: Function) {
	return new Promise(function (resolve) {
		let tries = 500
		const interval = setInterval(function () {
			tries--
			var result = provider()
			if (result) {
				resolve(result)
				clearInterval(interval)
			}
			if (tries < 0) {
				clearInterval(interval)
			}
		}, 20)
	})
}
