import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import hash from './hash'

/**
 * Session persisten svelte store.
 *
 * @param key Unique key. This string must persist over page reloads!
 * @param data Data to be stored
 */

export default function writableSession(key: string, data: object | unknown[]) {
	const storeKey = 'writableSession:' + hash(key)
	const storedData = browser ? window.sessionStorage.getItem(storeKey) : null
	const initialData = storedData ? JSON.parse(storedData) : data
	const { subscribe, set, update } = writable(initialData)

	return {
		subscribe,
		set: (data: object | unknown[]) => {
			if (browser) window.sessionStorage.setItem(storeKey, JSON.stringify(data))

			set(data)
		},
		update: (data: object | unknown[]) => {
			update(oldData => {
				const newData = { ...oldData, data }

				if (browser) window.sessionStorage.setItem(storeKey, JSON.stringify(newData))

				return newData
			})
		}
	}
}
