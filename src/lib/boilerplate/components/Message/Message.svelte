<script>
	import './message.scss'
	import classnames from 'classnames'
	export let type = null
	export let title = 'Hinweis'

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Message'

	$: className = classnames(baseName, $$props.class, !type || baseName + '--' + type)
</script>

<div class={className}>
	{#if title}
		<h4 class={baseName + '__title'}>
			{title}
		</h4>
	{/if}
	{#if $$slots.default}
		<slot />
	{/if}
	{#if $$slots.code}
		<pre><slot name="code" /></pre>
	{/if}
</div>
