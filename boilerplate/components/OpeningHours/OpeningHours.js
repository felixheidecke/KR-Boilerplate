import { format, formatDistance as fd } from 'date-fns'
import { de as locale } from 'date-fns/locale/index.js'
import oh from 'opening_hours'

export const localiseOpeningHours = (openingHours) => {
  return openingHours
    .replace(/Mo/g, 'Mo.')
    .replace(/Tu/g, 'Di.')
    .replace(/We/g, 'Mi.')
    .replace(/Th/g, 'Do.')
    .replace(/Fr/g, 'Fr.')
    .replace(/Sa/g, 'Sa.')
    .replace(/Su/g, 'So.')
    .replace(/-/g, ' - ')
    .replace(/off/g, 'geschlossen')
    .replace(/PH/g, 'Feiertags')
}

const formatDistance = (nextChange) => {
  const distance = 'in ' + fd(new Date(), nextChange, { locale })

  if (distance.includes('Tage')) {
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
    return format(this._nextChange, "EEEE 'um' p 'Uhr'", { locale })
  }

  get distanceToNextChange() {
    return formatDistance(this._nextChange)
  }

  get table() {
    const localised = localiseOpeningHours(this._hours)
    return localised.split(';').map((i) => i.trim())
  }
}

export default OpeningHours
