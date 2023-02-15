<script lang="ts">
	import './grid.scss'
	import classnames from 'classnames'

	type Tag = 'div' | 'ul' | 'li' | 'section' | 'main' | 'aside'
	type Gap = string | boolean
	type Size = string | boolean
	type Id = string

	// --- Props ------------------------

	export let tag: Tag = 'div'
	export let gap: Gap | undefined = undefined
	export let rowGap: Gap | undefined = undefined
	export let size: Size | undefined = undefined
	export let id: Id | undefined = undefined

	$: rowGap = $$props['row-gap']

	// --- Methods ----------------------

	function sizeToClass(size: Size) {
		if (!size || size === true) return

		return size
			.split(' ')
			.map((i) => `${baseName}__item--${i}`)
			.join(' ')
	}

	// --- CSS Class --------------------

	const baseName = 'Grid'
	const className = (() => {
		if (size) {
			return classnames(baseName + '__item', $$props.class, sizeToClass(size))
		} else {
			return classnames(
				baseName,
				$$props.class,
				!gap || baseName + '--gap',
				!rowGap || baseName + '--row-gap'
			)
		}
	})()
</script>

<svelte:element this={tag} class={className} {id}>
	<slot />
</svelte:element>
