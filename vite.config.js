import { sveltekit } from '@sveltejs/kit/vite'
import autoImport from 'sveltekit-autoimport'

const config = {
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
			include: ['./src/routes/**/*.svelte', './src/lib/boilerplate/components/**/*.svelte']
		}),
		sveltekit()
	],
	server: {
		port: 3000
	}
}

export default config
