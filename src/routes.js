export default [
	{
		path: '/',
		name: 'Home'
	},
	...demoPaths(), // Demo Inhalte. Zeile 2 kann gelöscht werden
	// {
	// 	path: '/beispiel',
	// 	name: 'Beispiel'
	// },
	{
		path: '/impressum',
		name: 'Impressum',
		class: '$hidden@desktop-up'
	},
	{
		path: '/datenschutz',
		name: 'Datenschutz',
		class: '$hidden@desktop-up'
	}
]

// Demo Inhalte. Zeile 15 - 90 kann gelöscht werden.
function demoPaths() {
	return [
		{
			name: 'Basis',
			routes: [
				{
					path: '/base/button',
					name: 'Button'
				},
				{
					path: '/base/icon',
					name: 'Icon'
				},
				{
					path: '/base/mail',
					name: 'Mail'
				},
				{
					path: '/base/message',
					name: 'Message'
				},
				{
					path: '/base/grid',
					name: 'Grid'
				}
			]
		},
		{
			path: '/akkordion',
			name: 'Akkordion'
		},
		{
			path: '/form',
			name: 'Formular'
		},
		{
			path: '/swiper',
			name: 'Swiper'
		},
		{
			name: 'Xioni',
			routes: [
				{
					path: '/xioni/artikel',
					name: 'Artikel'
				},
				{
					path: '/xioni/gallerie',
					name: 'Gallerie'
				},

				{
					path: '/xioni/speisekarte',
					name: 'Speisekarte'
				},
				{
					path: '/xioni/events',
					name: 'Events'
				},
				{
					path: '/xioni/events-toggle',
					name: 'Events (Toggle)'
				},
				{
					path: '/xioni/events-expanded',
					name: 'Events (Expanded)'
				}
			]
		},
		{
			path: '/projekte',
			name: 'Projekte'
		}
	]
}
