import { format } from 'date-fns'
import { de } from 'date-fns/locale/index.js'

export default function (from, to) {
  const daysMatch = format(from, 'd') === format(to, 'd')
  const yearsMatch = format(from, 'Y') === format(to, 'Y')
  const monthsMatch = format(from, 'LL') === format(to, 'LL')

  const longFormat = 'EEEE d.L.yyyy'
  const mediumFormat = 'EEEE d.L.'
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

  return `${format(from, fromFormat, { locale: de })} &ndash; ${format(to, longFormat, {
    locale: de
  })}`
}
