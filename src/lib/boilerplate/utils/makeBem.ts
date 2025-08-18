/**
 * Creates a BEM (Block Element Modifier) utility object for constructing
 * class names using the provided block name. It supports generating class names
 * for elements, modifiers, and element-modifier combinations according to the BEM convention.
 *
 * @param {string} block - The base block name to use in BEM class naming.
 * @returns {{
 *   block: string,
 *   element: (element: string) => string,
 *   modifier: (modifier: string) => string,
 *   elementModifier: (element: string) => (modifier: string) => string
 * }} An object with methods to generate BEM-style class names.
 */

export default function makeBEM<T>(block: T) {
	const ed = '__' // Element delimiter
	const md = '--' // Modifier delimiter

	return {
		block,
		/** @returns 'block__element' */
		element: (element: T) => {
			return block + ed + element
		},
		/** @returns 'block--modifier' */
		modifier: (modifier: T) => {
			return block + md + modifier
		},
		elementModifier: (element: T) => (modifier: T) => block + ed + element + md + modifier
	}
}
