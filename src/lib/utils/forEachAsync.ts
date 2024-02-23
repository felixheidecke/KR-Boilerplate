export const forEachAsync = async (array: any[], callback: Function) => {
	for (let item of array) {
		await callback(item)
	}
}
