import { kitConfig } from './src/lib/config.js'
import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-static'
import pkg from './package.json' assert { type: 'json' }

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		style: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: `
							$cdnPath: "${kitConfig.paths.assets}/_assets";

							@function cdnUrl($file) {
								@return url($cdnPath + $file);
							}`
					}
				}
			}
		}
	}),
	output: {
		preloadStrategy: 'preload-mjs'
	},
	kit: {
		inlineStyleThreshold: 25_000,
		adapter: adapter({
			pages: 'htdocs',
			assets: 'htdocs',
			fallback: '200.html',
			strict: false,
			precompress: false
		}),
		alias: {
			$variables: './src/lib/styles/variables.scss',
			$routes: './src/routes.js',
			$stammdaten: './src/lib/stammdaten.js'
		},
		version: {
			name: `Boilerplate: ${pkg.version}; Built: ${new Date().toString()}`
		},
		...kitConfig
	}
}

export default config
