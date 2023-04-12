<script lang="ts">
	import './Grid.scss'
	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { GridProps } from './Grid.types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let tag: GridProps['tag'] = 'div'
	export let gap: GridProps['gap'] = false
	export let size: GridProps['size'] = undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	$: className = !size ? createParentClassName(gap) : createChildClassName(size)

	function createChildClassName(size: GridProps['size']) {
		return classnames(
			'Grid__item',
			!size?.length ||
				size
					.split(' ')
					.map(i => `Grid__item--${i}`)
					.join(' ')
		)
	}

	function createParentClassName(gap: GridProps['gap']) {
		const className = ['Grid']

		if (typeof gap === 'number') {
			className.push(`Grid--gap-${gap}`)
		} else if (gap) {
			className.push('Grid--gap')
		}

		return classnames(...className)
	}
</script>

<svelte:element this={tag} class={classnames(className, $$props.class)}>
	<slot />
</svelte:element>
