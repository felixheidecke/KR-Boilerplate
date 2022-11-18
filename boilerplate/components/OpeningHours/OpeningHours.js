import { format, formatDistanceToNow as fd } from 'date-fns'
import de from 'date-fns/locale/de/index'

import oh from 'opening_hours'

const t = {
  MON: 'Mo.',
  TUE: 'Di.',
  WED: 'Mi.',
  THU: 'Do.',
  FRI: 'Fr.',
  SAT: 'Sa.',
  SUN: 'So.',
  CLOSED: 'geschlossen',
  HOLIDAY: 'Feiertags',
  O_CLOCK: 'Uhr',
  DAYS: 'Tage',
  AT: 'um',
  IN: 'in'
}

export const localiseOpeningHours = (openingHours) => {
  return openingHours
    .replace(/Mo/g, t.MON)
    .replace(/Tu/g, t.TUE)
    .replace(/We/g, t.WED)
    .replace(/Th/g, t.THU)
    .replace(/Fr/g, t.FRI)
    .replace(/Sa/g, t.SAT)
    .replace(/Su/g, t.SUN)
    .replace(/-/g, ' - ')
    .replace(/off/g, t.CLOSED)
    .replace(/PH/g, t.HOLIDAY)
}

const formatDistance = (nextChange) => {
  const distance = `${t.IN} ${fd(nextChange, { locale: de })}`

  if (distance.includes(t.DAYS)) {
    return distance + 'n'
  }

  return distance
}

class OpeningHours {
  constructor(hours) {
    this._nominatim = {
      // Center of Germany
      lat: 51.163361,
      lon: 10.447683,
      address: {
        country_code: 'de'
      }
    }

    this._hours = hours
    this._oh = new oh(hours, this._nominatim)
    this._openNow = this._oh.getState()
    this._nextChange = this._oh.getNextChange()
  }

  // --- Setter -----------------------

  set countryCode(code) {
    this._nominatim.address.country_code = code
  }

  set coordinates({ lat, lon }) {
    this._nominatim.lat = lat
    this._nominatim.lon = lon
  }

  // --- Getter -----------------------

  get openNow() {
    return this._openNow
  }

  get nextChange() {
    return format(this._nextChange, `EEEE '${t.AT}' p '${t.O_CLOCK}'`, { locale: de })
  }

  get distanceToNextChange() {
    return formatDistance(this._nextChange)
  }

  get table() {
    const localised = localiseOpeningHours(this._hours)
    return localised.split(';').map((i) => {
      let hour = i.trim()

      if (!hour.includes(t.CLOSED)) hour += ` ${t.O_CLOCK}`

      return hour
    })
  }
}

export default OpeningHours
