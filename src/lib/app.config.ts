import * as ENV from '$env/static/public'

const { PUBLIC_KR_API_URL, PUBLIC_KR_API_KEY } = ENV as any

export default {
	api: {
		url: PUBLIC_KR_API_URL || 'https://api.klickrhein.de/v6',
		key: PUBLIC_KR_API_KEY || ''
	}
}
