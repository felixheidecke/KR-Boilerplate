import { format as formatDate } from 'date-fns'
import { de } from 'date-fns/locale'

const longFormat = 'EEEE d. LLLL yyyy'
const mediumFormat = 'EEEE d. LLLL'
const shortFormat = 'EEEE d.'

export function formatFromTo(from: Date, to: Date) {
	if (!from) {
		throw new Error('date missing')
	}

	if (!to) {
		return formatDate(to, longFormat)
	}

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

	return `${format(from, fromFormat)} - ${format(to, longFormat)}`
}

export function format(date: Date, pattern: string): string {
	return formatDate(date, pattern, { locale: de })
}
