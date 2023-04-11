<script>
	import { get as getMenuCard } from '$lib/boilerplate/libraries/xioni/menuCard'
</script>

<h1>Speisekarte</h1>

{#await getMenuCard(831) then menuCard}
	<XioniMenuCard {menuCard} />
{/await}
