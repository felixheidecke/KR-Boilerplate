import { format as formatDate } from 'date-fns'
// import { de } from 'date-fns/locale/index.js'
import de from 'date-fns/locale/de/index'

export const formatFromTo = (from, to) => {
  if (!from || !to) return 'no date'

  const daysMatch = formatDate(from, 'd') === formatDate(to, 'd')
  const yearsMatch = formatDate(from, 'Y') === formatDate(to, 'Y')
  const monthsMatch = formatDate(from, 'LL') === formatDate(to, 'LL')

  const longFormat = 'EEEE d. LLLL yyyy'
  const mediumFormat = 'EEEE d. LLLL'
  const shortFormat = 'EEEE d.'

  let fromFormat

  if (daysMatch && monthsMatch && yearsMatch) {
    return format(from, longFormat, { locale: de })
  }

  if (!yearsMatch) {
    fromFormat = longFormat
  } else if (!monthsMatch) {
    fromFormat = mediumFormat
  } else {
    fromFormat = shortFormat
  }

  return `${formatDate(from, fromFormat, { locale: de })} &ndash; ${format(to, longFormat, {
    locale: de
  })}`
}

export const format = (date, pattern) => {
  return formatDate(date, pattern, { locale: de })
}
