import * as ENV from '$env/static/public'

const { PUBLIC_SHOP_MODULE_ID, PUBLIC_PAYPAL_CLINET_ID } = ENV as any

export default {
	module: parseInt(PUBLIC_SHOP_MODULE_ID) || 0,
	payPalClientId: PUBLIC_PAYPAL_CLINET_ID || ''
} as const
