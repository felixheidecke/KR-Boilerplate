export default function objectFilterBy(obj: object, filter: (value: any) => boolean): object {
	const result = {} as Record<string, any>

	Object.entries(obj).forEach(([key, value]) => {
		if (filter(value)) {
			result[key] = value
		}
	})

	return result
}
