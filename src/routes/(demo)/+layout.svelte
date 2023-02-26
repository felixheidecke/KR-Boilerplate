<slot />

<style>
	:global(.component-title) {
		text-align: center;
	}

	:global(.component-title:before) {
		content: '<';
	}
	:global(.component-title:after) {
		content: ' />';
	}
</style>
