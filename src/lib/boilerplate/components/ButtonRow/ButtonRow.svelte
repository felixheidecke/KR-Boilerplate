<script>
	import './button-row.scss'
	import classNames from 'classnames'

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'ButtonRow'

	$: className = classNames(baseName, $$props.class)
</script>

<div data-component class={className}>
	<slot />
</div>
