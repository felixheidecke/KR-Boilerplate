<script>
	import { goto } from '$app/navigation'
	import { INVOICE_ADDRESS, CART } from '../../_stores'

	const address = { ...$INVOICE_ADDRESS }
</script>

<h1 class="h2">Zusammenfassung</h1>

<p>Bitte überprüfen Sie die Daten auf Richtigkeit, bevor Sie die Bestellung abschließen.</p>

<h2 class="h3">Rechnungsadresse</h2>

<ol>
	{#if address.company}
		<li>{address.company}</li>
	{/if}
	<li class="$font-bold">
		{address.salutation}
		{address.firstname}
		{address.name}
	</li>
	<li>
		{address.address}
	</li>
	<li>
		{address.zip}
		{address.city}
	</li>
	<li class="$mt-1/2">
		Telefon: {address.phone}
	</li>
	<li>
		E-Mail: {address.email}
	</li>
	<li class="$mt-1/2">
		<Link icon="fas fa-pen" to="./address">anpassen</Link>
	</li>
</ol>

<h2 class="h3 $mt-3">Warenkorb</h2>

<XioniShopCartTable {...$CART} />

<Link icon="fas fa-pen" to="./cart">anpassen</Link>

<div class="$mt-2">
	<Button to="./done">Jetzt kostenpflichtig bestellen</Button>
</div>
