import { LOCALE } from '../constants'

export default function (price: number) {
	return new Intl.NumberFormat(LOCALE, {
		style: 'currency',
		currency: 'EUR'
	}).format(price)
}
