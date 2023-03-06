import '$lib/boilerplate/styles/style.scss'
import '$lib/styles/style.scss'

import { ROUTES, ACTIVE_ROUTE } from '$lib/boilerplate/stores/routes'

const { title, web } = $$props.data.stammdaten
$: path = $$props.data.url.pathname
$: routes = $ROUTES
$: activeRoute = $ACTIVE_ROUTE
