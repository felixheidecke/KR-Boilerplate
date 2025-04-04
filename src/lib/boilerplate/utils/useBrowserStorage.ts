import { browser } from '$app/environment'

export default class BrowserStorage {
	constructor(
		private storage: Storage,
		readonly namespace: string
	) {}

	public set<T>(value: T): void {
		const data = typeof value === 'string' ? value : JSON.stringify(value)

		this.storage.setItem(this.namespace, data)
	}

	public get<T>() {
		const data = this.storage.getItem(this.namespace)

		return data ? (JSON.parse(data) as T) : null
	}

	public setGet<T>(data: T): T {
		this.set(data)

		return data
	}

	public get isPopulated() {
		return browser ? !!this.storage.getItem(this.namespace) : false
	}
}

export async function fetchWithStorage<T>(
	storage: BrowserStorage,
	fetchFn: () => Promise<T>
): Promise<T> {
	if (storage.isPopulated) {
		return storage.get() as T
	}

	const data = await fetchFn()

	storage.set(data as string | object)

	return data
}
