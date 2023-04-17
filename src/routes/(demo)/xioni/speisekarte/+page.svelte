<script>
	import { get } from '$lib/boilerplate/libraries/xioni/menuCard'

	const getMenuCard = get(831)
</script>

<h1>Speisekarte</h1>

{#await getMenuCard then menuCard}
	<XioniMenuCard {menuCard} />
{/await}
