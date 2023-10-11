import * as ENV from '$env/static/public'

export default {
	module: parseInt((ENV as any).PUBLIC_SHOP_MODULE_ID) || 0,
	payPalClientId: (ENV as any).PUBLIC_PAYPAL_CLINET_ID
} as const
