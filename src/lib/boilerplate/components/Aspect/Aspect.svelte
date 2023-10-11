<script>
	import './aspect.scss'
	import classnames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let ratio = '16:9'
	export let baseName = 'Aspect'

	// -----------------------------------------------------------------------------------------------

	const [x, y] = ratio.split(':')
	const className = classnames(baseName, $$props.class)
</script>

<div class={className}>
	<div class={baseName + '__ratio'} style={`padding-top: ${(+y / +x) * 100}%`} />
	<div class={baseName + '__content'}>
		<slot />
	</div>
</div>
