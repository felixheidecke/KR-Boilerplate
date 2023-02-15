import { format, formatDistanceToNow } from 'date-fns'
import de from 'date-fns/locale/de/index'
import openingHours from 'opening_hours'

enum T {
	MON = 'Mo.',
	TUE = 'Di.',
	WED = 'Mi.',
	THU = 'Do.',
	FRI = 'Fr.',
	SAT = 'Sa.',
	SUN = 'So.',
	CLOSED = 'geschlossen',
	HOLIDAY = 'Feiertags',
	O_CLOCK = 'Uhr',
	DAYS = 'Tage',
	AT = 'um',
	IN = 'in'
}

export default class {
	private nominatim: any | { address: {} }
	private hours
	private parsed

	constructor(hours: string) {
		// Center of Germany
		this.setCoordinates(51.163361, 10.447683)
		this.setCountryCode('de')

		this.hours = hours
		this.parsed = new openingHours(hours, this.nominatim)
	}

	setCountryCode(code: string) {
		this.nominatim.address.country_code = code

		return this
	}

	setCoordinates(lat: number, lon: number) {
		this.nominatim.lat = lat
		this.nominatim.lon = lon

		return this
	}

	get openNow(): boolean {
		return this.parsed.getState()
	}

	get nextChange(): string {
		return format(this.parsed.getNextChange(), `EEEE '${T.AT}' p '${T.O_CLOCK}'`, { locale: de })
	}

	get distanceToNextChange(): string {
		const distance = `${T.IN} ${formatDistanceToNow(this.parsed.getNextChange(), { locale: de })}`

		if (distance.includes(T.DAYS)) {
			return distance + 'n'
		}

		return distance
	}

	get table(): string[] {
		const localised = this.localiseOpeningHours(this.hours)

		return localised.split(';').map((i) => {
			let hour = i.trim()

			if (!hour.includes(T.CLOSED)) hour += ` ${T.O_CLOCK}`

			return hour
		})
	}

	private localiseOpeningHours(openingHours: string) {
		return openingHours
			.replace(/Mo/g, T.MON)
			.replace(/Tu/g, T.TUE)
			.replace(/We/g, T.WED)
			.replace(/Th/g, T.THU)
			.replace(/Fr/g, T.FRI)
			.replace(/Sa/g, T.SAT)
			.replace(/Su/g, T.SUN)
			.replace(/-/g, ' - ')
			.replace(/off/g, T.CLOSED)
			.replace(/PH/g, T.HOLIDAY)
	}
}
