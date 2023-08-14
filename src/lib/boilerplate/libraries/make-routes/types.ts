export interface Route {
	name: string
	path?: string
	class?: string
	routes?: Route[]
	meta?: string | object
}
