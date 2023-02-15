export default function (input: string | object): string {
	let hash = 0
	if (typeof input === 'object') {
		input = JSON.stringify(input)
	}

	for (let i = 0; i < input.length; i++) {
		const char = input.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash &= hash // Convert to 32bit integer
	}
	return new Uint32Array([hash])[0].toString(36).padEnd(6, '0')
}
