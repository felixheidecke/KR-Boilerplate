import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import appConfig from './src/lib/app.config'
import autoImport from 'sveltekit-autoimport'

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern'
			}
		}
	},
	plugins: [
		autoImport({
			components: [
				{
					name: './src/lib/boilerplate/components',
					flat: true
				},
				{
					name: './src/lib/components',
					flat: true
				}
			],
			include: ['./src/**/*.svelte']
		}),
		sveltekit()
	],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				changeOrigin: true,
				target: 'https://api.klickrhein.de/',
				rewrite: path => path.replace(/^\/api\//, ''),
			}
		}
	}
})
