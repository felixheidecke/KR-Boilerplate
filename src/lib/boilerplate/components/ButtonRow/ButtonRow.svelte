<script>
	import './ButtonRow.scss'
	import classNames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const baseName = 'ButtonRow'
</script>

<div class={classNames(baseName, $$props.class)}>
	<slot />
</div>
