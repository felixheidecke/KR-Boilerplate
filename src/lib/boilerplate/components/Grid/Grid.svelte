<script lang="ts">
	import './grid.scss'
	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	type Tag = 'div' | 'ul' | 'li' | 'section' | 'main' | 'aside'
	type Gap = 'row' | 'column' | boolean
	type Size = string | undefined
	type Id = string

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let tag: Tag = 'div'
	export let gap: Gap = false
	export let size: Size = undefined
	export let id: Id | undefined = undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Grid'
	const className = !size ? createParentClassName() : createChildClassName()

	function sizeToClass(size: Size) {
		if (!size) return

		return size
			.split(' ')
			.map((i) => `${baseName}__item--${i}`)
			.join(' ')
	}

	function createChildClassName() {
		return classnames(baseName + '__item', sizeToClass(size), $$props.class)
	}

	function createParentClassName() {
		const className = [baseName]

		if (gap === 'column') {
			className.push(baseName + '--column-gap')
		} else if (gap === 'row') {
			className.push(baseName + '--row-gap')
		} else if (gap) {
			className.push(baseName + '--gap')
		}

		return classnames(...className, $$props.class)
	}
</script>

<svelte:element this={tag} class={className} {id}>
	<slot />
</svelte:element>
