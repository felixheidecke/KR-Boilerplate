import * as ENV from '$env/static/public'

export default {
	api: {
		url: (ENV as any).PUBLIC_KR_API_URL || 'https://api.klickrhein.de/v5',
		key: (ENV as any).PUBLIC_KR_API_KEY
	}
}
