<script lang="ts">
	import './Pagination.scss'

	import classNames from 'classnames'
	import { range } from 'lodash-es'

	export let baseName = 'Pagination'
	export let pagesCount: number
	export let currentPage: number
	export let clickHandler: (page: number) => void = () => ''
</script>

<div class={classNames(baseName, $$props.class)}>
	{#each range(1, pagesCount) as page}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<span
			aria-label="Zu Seite {page}"
			class={classNames(
				'Pagination__item',
				page === currentPage ? 'Pagination__item--current' : null
			)}
			on:click={() => {
				if (page === currentPage) return

				clickHandler(page)
			}}>
			{page}
		</span>
	{/each}
</div>
