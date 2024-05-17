import { PUBLIC_SHOP_MODULE_ID, PUBLIC_PAYPAL_CLINET_ID } from '$env/static/public'

export default {
	module: parseInt(PUBLIC_SHOP_MODULE_ID) || 0,
	path: '/shop',
	payPalClientId: PUBLIC_PAYPAL_CLINET_ID
} as const
