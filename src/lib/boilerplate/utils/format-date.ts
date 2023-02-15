import { format as formatDate } from 'date-fns'
import de from 'date-fns/locale/de/index'

export function formatFromTo(from: Date, to: Date) {
	if (!from || !to) throw 'no date'

	const daysMatch = formatDate(from, 'd') === formatDate(to, 'd')
	const yearsMatch = formatDate(from, 'Y') === formatDate(to, 'Y')
	const monthsMatch = formatDate(from, 'LL') === formatDate(to, 'LL')

	const longFormat = 'EEEE d. LLLL yyyy'
	const mediumFormat = 'EEEE d. LLLL'
	const shortFormat = 'EEEE d.'

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

	return `${format(from, fromFormat)} &ndash; ${format(to, longFormat)}`
}

export function format(date: Date, pattern: string): string {
	return formatDate(date, pattern, { locale: de })
}
