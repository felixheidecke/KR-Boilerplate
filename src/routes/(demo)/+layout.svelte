<script>
	import { onMount } from 'svelte'
	import './+layout.scss'

	let isPrettyLayoutActive

	function activatePrettyLayout() {
		document.body.classList.add('pretty')
		isPrettyLayoutActive = true
	}

	function disablePrettyLayout() {
		document.body.classList.remove('pretty')
		isPrettyLayoutActive = false
	}
</script>

<div class:pretty={isPrettyLayoutActive}>
	<slot />
</div>

<div class="style-toggle-wrapper">
	{#if isPrettyLayoutActive}
		<Button icon="fas fa-eye" on:click={disablePrettyLayout}>pretty</Button>
	{:else}
		<Button icon="fas fa-eye-slash" on:click={activatePrettyLayout}>default</Button>
	{/if}
</div>

<style>
	.style-toggle-wrapper {
		position: absolute;
		z-index: 1;
		top: 1rem;
		left: 1rem;
	}
</style>
