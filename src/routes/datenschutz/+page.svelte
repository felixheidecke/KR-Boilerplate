<script>
	import { format } from '$lib/boilerplate/utils/format-date'

	const { stammdaten } = $$props.data
	const lastUpdated = format(new Date('1983-6-5'), 'PPPP')
</script>

<svelte:head>
	<title>Datenschutz | {stammdaten.title}</title>
</svelte:head>

<h1>Datenschutz</h1>

<p>
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque corporis id rem praesentium libero
	soluta enim quia, nobis corrupti quos accusantium, in minus molestiae voluptatibus omnis, incidunt
	error cupiditate ipsa.
</p>

<hr />

<p class="$text-right $font-small $font-italic">
	Stand: {lastUpdated} | {stammdaten.name}
</p>

<style lang="scss">
	@import '$variables';
</style>
