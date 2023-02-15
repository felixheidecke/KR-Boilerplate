import type { Routes } from '$lib/boilerplate/libraries/routes/types'

export const routes: Routes = [
	{
		path: '/',
		name: 'Home'
	},
	{
		path: '/speisekarte',
		name: 'Speisekarte'
	},
	{
		path: '/events',
		name: 'Events'
	},
	{
		path: '/gallerie',
		name: 'Gallerie'
	},
	{
		path: '/artikel',
		name: 'Artikel'
	}
]
