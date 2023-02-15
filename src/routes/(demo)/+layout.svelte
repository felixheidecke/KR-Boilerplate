<script>
	import '$lib/boilerplate/styles/style.scss'
	import '$lib/styles/style.scss'
</script>

<div class="$p-2">
	<header class="$mb-4 $text-center">
		<h1>Boilerplate 4</h1>
	</header>
	<nav>
		<Nav />
	</nav>
	<main>
		<slot />
	</main>
</div>

<style>
	div {
		max-width: 960px;
		margin: 0 auto;
	}
</style>
