export interface Route {
	name: string
	path?: string
	class?: string
	routes?: Routes
}

export type Routes = Route[]
