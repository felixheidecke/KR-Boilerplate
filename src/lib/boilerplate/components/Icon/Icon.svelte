<script lang="ts">
	import './Icon.css'

	import classnames from 'classnames'

	export let name = 'fas fa-carrot'
	export let size: number | string = 0

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Icon'

	$: className = classnames(
		$$props.class,
		baseName,
		name,
		!(+size > 1 && +size <= 10) || `fa-${size}x`
	)
</script>

<i class={className} aria-hidden="true" on:click />
