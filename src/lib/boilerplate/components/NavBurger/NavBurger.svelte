<script>
	import './NavBurger.scss'
	import classNames from 'classnames'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let active = false
	export let baseName = 'NavBurger'

	// -----------------------------------------------------------------------------------------------

	$: className = classNames(baseName, !active || 'NavBurger--active')
</script>

<button on:click aria-label="Menü" {...$$restProps} class={className}>
	<!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
	<svg class="NavBurger__svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path
			class="NavBurger__svg-path"
			d="M5 8H13.75M5 12H19M10.25 16L19 16"
			stroke-linecap="round"
			stroke-linejoin="round" />
	</svg>
</button>
