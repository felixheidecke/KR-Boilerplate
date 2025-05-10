<script lang="ts">
	import classnames from 'classnames'

	export let name = 'wine'
	export let baseName = 'Fontello'
</script>

<i class={classnames($$props.class, baseName, 'fontello-' + name)} aria-hidden="true" on:click></i>
