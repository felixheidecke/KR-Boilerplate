import * as ENV from '$env/static/public'

const { PUBLIC_KR_API_KEY } = ENV

export default {
	krApiKey: PUBLIC_KR_API_KEY || ''
}
