import { writable } from 'svelte/store'

export default function booleanStore(initialState: boolean = false) {
	const { subscribe, set, update } = writable(initialState)

	return {
		subscribe,
		true: () => set(true),
		false: () => set(false),
		toggle: () => update(n => !n)
	}
}
