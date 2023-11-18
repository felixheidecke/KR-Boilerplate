import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { kitConfig } from './src/lib/config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	output: {
		preloadStrategy: 'preload-mjs'
	},
	kit: {
		inlineStyleThreshold: 10000,
		adapter: adapter({
			pages: 'htdocs/pages',
			assets: 'htdocs/assets',
			fallback: '200.html',
			strict: false,
			precompress: false
		}),
		alias: {
			$variables: './src/lib/styles/variables.scss',
			$routes: './src/routes.js',
			$stammdaten: './src/lib/stammdaten.js'
		},
		...kitConfig
	}
}

export default config
