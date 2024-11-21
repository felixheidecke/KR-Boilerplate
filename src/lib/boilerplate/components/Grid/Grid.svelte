<script lang="ts">
	import './Grid.scss'
	import classnames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let tag: string = 'div'
	export let gap: 0 | 2 | 4 | 6 | 8 | boolean = 0
	export let size: string | boolean = false
	export let id: string | undefined = undefined
	export let index: number | string | undefined = undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	$: className = !size ? createParentClassName() : createChildClassName()

	function createChildClassName() {
		return classnames(
			'Grid__item',
			!size ||
				('' + size)
					.split(' ')
					.map(i => `Grid__item--${i}`)
					.join(' ')
		)
	}

	function createParentClassName() {
		const className = ['Grid']

		if (gap && typeof gap === 'number') {
			className.push(`Grid--gap-${gap}`)
		} else if (gap) {
			className.push('Grid--gap')
		}

		return classnames(...className)
	}
</script>

<svelte:element this={tag} {id} class={classnames(className, $$props.class)} data-index={index}>
	<slot />
</svelte:element>
