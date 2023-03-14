<script>
	import './Accordion.css'

	import classnames from 'classnames'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let id = ''

	let activeItem = writable(null)
	setContext('Accordion:active-item', activeItem)

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Accordion'
	$: className = classnames(baseName, $$props.class)
</script>

<ul {id} class={className}>
	<slot />
</ul>
