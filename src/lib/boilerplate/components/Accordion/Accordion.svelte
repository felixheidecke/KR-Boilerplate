<script>
	import './Accordion.css'

	import classnames from 'classnames'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	let activeItem = writable(null)
	setContext('Accordion:active-item', activeItem)

	// --- CSS Class --------------------

	const baseName = $$props['ex-class'] || 'Accordion'
</script>

<ul class={classnames(baseName, $$props.class)}>
	<slot />
</ul>
