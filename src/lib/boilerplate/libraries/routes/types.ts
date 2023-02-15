export interface Route {
	path: string
	name: string
	class?: string
	routes?: Routes
}

export type Routes = Route[]
