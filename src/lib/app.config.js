import * as ENV from '$env/static/public'

export default {
	payPalClientId: ENV.PUBLIC_PAYPAL_CLIENT_ID || '',
	shopApiKey: ENV.PUBLIC_SHOP_API_KEY || '',
	shopModuleID: ENV.PUBLIC_SHOP_MODULE_ID || 0
}