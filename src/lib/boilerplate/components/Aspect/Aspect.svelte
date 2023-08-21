<script>
	import './aspect.scss'
	import classnames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let ratio = '16:9'

	// -----------------------------------------------------------------------------------------------

	const [x, y] = ratio.split(':')
	const baseName = $$props['ex-class'] || 'Aspect'
	const className = classnames(baseName, $$props.class)
</script>

<div class={className}>
	<div class={baseName + '__ratio'} style={`padding-top: ${(+y / +x) * 100}%`} />
	<div class={baseName + '__content'}>
		<slot />
	</div>
</div>
