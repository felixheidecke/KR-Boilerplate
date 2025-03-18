import { format as formatDate } from 'date-fns'
import { de } from 'date-fns/locale'

const longFormat = 'EEEE d. LLLL yyyy'
const mediumFormat = 'EEEE d. LLLL'
const shortFormat = 'EEEE d.'

/**
 * Formats a date range from a start date to an end date into a readable string,
 * choosing different formats based on whether days, months, or years match.
 * If only one date is provided, it formats the single date.
 *
 * @param {Date} from - The start date.
 * @param {Date} to - The end date.
 * @param {Object} [config] - Optional configuration object.
 * @param {string} [config.delimiter='-'] - Delimiter between formatted dates.
 *
 * @returns {string} The formatted date range.
 *
 * @throws {Error} Throws an error if the 'from' date is missing.
 */

export function formatFromTo(from: Date, to: Date, config: { delimiter?: string } = {}) {
	if (!from) {
		throw new Error('date missing')
	}

	if (!to) {
		return formatDate(to, longFormat)
	}

	const delimiter = config.delimiter || '-'
	const daysMatch = formatDate(from, 'd') === formatDate(to, 'd')
	const yearsMatch = formatDate(from, 'y') === formatDate(to, 'y')
	const monthsMatch = formatDate(from, 'LL') === formatDate(to, 'LL')

	let fromFormat

	if (daysMatch && monthsMatch && yearsMatch) {
		return format(from, longFormat)
	}

	if (!yearsMatch) {
		fromFormat = longFormat
	} else if (!monthsMatch) {
		fromFormat = mediumFormat
	} else {
		fromFormat = shortFormat
	}

	return `${format(from, fromFormat)} ${delimiter} ${format(to, longFormat)}`
}

/**
 * Formats a single date according to the given pattern using the German locale.
 *
 * @param {Date} date - The date to format.
 * @param {string} pattern - The formatting pattern.
 *
 * @returns {string} The formatted date string.
 */

export function format(date: Date, pattern: string): string {
	return formatDate(date, pattern, { locale: de })
}
