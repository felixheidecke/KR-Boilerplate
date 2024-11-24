<script lang="ts">
	import classnames from 'classnames'

	export let name = 'fas fa-carrot'
	export let size: number | string = 0
	export let baseName = 'Icon'

	// -----------------------------------------------------------------------------------------------

	$: className = classnames(
		$$props.class,
		baseName,
		name,
		!(+size > 1 && +size <= 10) || `fa-${size}x`
	)
</script>

<i class={className} aria-hidden="true" on:click></i>
