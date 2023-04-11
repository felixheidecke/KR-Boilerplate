<script>
	import './Toplink.scss'
	import classnames from 'classnames'

	// --- Data --------------------------------------------------------------------------------------

	export let name = null

	let isVisible = false

	const baseName = $$props['ex-class'] || 'Toplink'

	$: className = classnames(baseName, $$props.class, !isVisible || baseName + '--visible')

	// --- Methods -----------------------------------------------------------------------------------

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	function handleOffset() {
		isVisible = window.scrollY > 200
	}
</script>

<svelte:window on:scroll|passive={handleOffset} />

<button {name} class={className} on:click={scrollToTop}>
	<svg class="{baseName}__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
		<!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
		<path
			d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
	</svg>
</button>
