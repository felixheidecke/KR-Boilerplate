import { PUBLIC_KR_API_URL, PUBLIC_KR_API_KEY } from '$env/static/public'

export default {
	api: {
		url: PUBLIC_KR_API_URL || 'https://api.klickrhein.de/v5',
		key: PUBLIC_KR_API_KEY || ''
	}
} as const
