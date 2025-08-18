export type PaginationProps = {
	baseName?: string
	class?: string

	pagesCount: number
	currentPage: number

	clickHandler: (page: number) => void
}
