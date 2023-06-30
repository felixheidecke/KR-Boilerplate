import { browser } from '$app/environment'

type Data = string | object | Array<string | object>

export default function sessionStorage(key: string) {
	return {
		filled: () => has(key),
		read: () => read(key),
		write: (data: Data) => write(key, data)
	}
}

export function write(key: string, value: Data) {
	if (!browser) return value

	const type = typeof value
	const payload = {
		type,
		data: type === 'string' ? value : JSON.stringify(value)
	}

	window.sessionStorage.setItem(key, JSON.stringify(payload))

	return value
}

export function read(key: string) {
	if (!browser) return null

	const payload = window.sessionStorage.getItem(key)

	if (!payload) return

	const { type, data } = JSON.parse(payload)

	return type === 'string' ? data : JSON.parse(data)
}

export function has(key: string) {
	if (!browser) return null

	return !!window.sessionStorage.getItem(key)
}
