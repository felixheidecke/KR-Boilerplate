<script>
	import './Accordion.css'

	import classnames from 'classnames'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let baseName = 'Accordion'

	// -----------------------------------------------------------------------------------------------

	let activeItem = writable(null)

	setContext('Accordion:active-item', activeItem)
</script>

<ul {...$$restProps} class={classnames(baseName, $$props.class)}>
	<slot />
</ul>
