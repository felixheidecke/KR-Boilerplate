<script lang="ts">
	import './Pagination.scss'

	import classNames from 'classnames'
	import { range } from 'lodash-es'
	import type { PaginationProps } from './Pagination'

	let {
		baseName = 'Pagination',
		class: className,

		currentPage,
		pagesCount,

		clickHandler,
		...restProps
	}: PaginationProps = $props()
</script>

<div class={classNames(baseName, className)} {...restProps}>
	{#each range(1, pagesCount) as page}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			aria-label="Zu Seite {page}"
			class={classNames(
				'Pagination__item',
				page === currentPage ? 'Pagination__item--current' : null
			)}
			onclick={() => {
				if (page === currentPage && typeof clickHandler === 'function') return

				clickHandler(page)
			}}>
			{page}
		</span>
	{/each}
</div>
