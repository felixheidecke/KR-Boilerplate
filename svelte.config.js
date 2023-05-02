import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	output: {
		preloadStrategy: 'preload-mjs'
	},

	kit: {
		inlineStyleThreshold: 10000,
		adapter: adapter({
			pages: 'htdocs',
			assets: 'htdocs',
			fallback: '200.html',
			strict: false,
			precompress: false
		}),
		alias: {
			$variables: './src/lib/styles/variables.scss'
		}
	}
}

export default config
