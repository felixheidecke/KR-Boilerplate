import { readFileSync } from 'fs'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-static'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
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
			$styles: './src/lib/styles/',
			$routes: './src/routes.js',
			$stammdaten: './src/lib/stammdaten.js'
		},
		version: {
			name: `Boilerplate: ${pkg.version}; Built: ${new Date().toString()}`
		}
	}
}

export default config
