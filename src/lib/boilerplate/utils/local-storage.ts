import { browser } from '$app/environment'

type Data = string | object | Array<string | object>

export default function localStorage(key: string) {
	return {
		read: () => read(key),
		write: (data: Data) => write(key, data),
		remove: () => remove(key)
	}
}

export function write(key: string, value: Data) {
	if (!browser) return

	const type = typeof value
	const payload = {
		type,
		data: type === 'string' ? value : JSON.stringify(value)
	}

	window.localStorage.setItem(key, JSON.stringify(payload))

	return value
}

export function read(key: string) {
	if (!browser) return null

	const payload = window.localStorage.getItem(key)

	if (!payload) return

	const { type, data } = JSON.parse(payload)

	return type === 'string' ? data : JSON.parse(data)
}

export function remove(key: string) {
	if (!browser) return

	window.localStorage.removeItem(key)
}
