<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation'

	let isPageLoading = false

	beforeNavigate(() => (isPageLoading = true))
	afterNavigate(() => (isPageLoading = false))
</script>

<div class="load-cover" class:load-cover--hidden={!isPageLoading} aria-hidden>
	<div class="$absolute-center">
		<Icon name="fas fa-spinner fa-pulse" size="3" />
	</div>
</div>

<slot />

<style>
	.load-cover {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 1;
		opacity: 1;
		transition: opacity 250ms;
		transition-delay: 100ms;
		background: rgba(255, 255, 255, 0.75);
	}

	.load-cover--hidden {
		user-select: none;
		pointer-events: none;
		opacity: 0;
	}
</style>
