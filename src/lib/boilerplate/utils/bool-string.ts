export const isTrue = function (variable: any): boolean {
	if (variable === 'false') return false
	return !!variable
}

export const isFalse = (variable: any): boolean => !isTrue(variable)
