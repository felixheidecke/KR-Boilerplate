import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'htdocs',
			assets: 'htdocs',
			fallback: null,
			strict: false,
			precompress: false
		}),
		alias: {
			$variables: './src/lib/styles/variables.scss'
		}
	}
}

export default config
