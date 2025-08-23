<script>
	import stammdaten from '$lib/stammdaten'
	import config from '$lib/app.config'
	import { da } from 'date-fns/locale'
	import { each } from 'lodash-es'

	let { data } = $props()
	const { shippingCost } = data.infos
</script>

<svelte:head>
	<title>AGB | {stammdaten.title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Wrapper class="$px-0">
	<h1>Allgemeine Geschäftsbedingungen</h1>
	<p>Der Kaufvertrag kommt zustande mit {stammdaten.name}.</p>
	<h4>Lieferbedingungen</h4>
	<p>Zuzüglich zu den angegebenen Produktpreisen kommen noch Versandkosten hinzu.</p>

	{#if shippingCost.rates.length}
		<table class="$w-fit-content">
			<tbody>
				{#each shippingCost.rates as { threshold, rate }}
					<tr>
						<td>Bis inkl. {threshold} {shippingCost.unit}:</td>
						<td class="$text-right">{rate.formatted}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	{#if shippingCost.text}
		<p>{shippingCost.text}</p>
	{/if}

	{#if shippingCost.freeShippingThreshold}
		<p>
			Beträgt der Gesamtwarenwert mindestens <strong
				>{shippingCost.freeShippingThreshold.formatted}</strong
			>, so erfolgt die Lieferung frei Haus.
		</p>
	{/if}

	<h4>Bezahlung</h4>
	<p>In unserem Shop bieten wir Ihnen folgenden Zahlungsarten an:</p>
	<ul class="--dash">
		<li>Vorkasse</li>
		{#if config.payPalClientId}
			<li>Paypal</li>
		{/if}
	</ul>
</Wrapper>

<style>
	h4 {
		counter-increment: agb-counter;
	}

	h4::before {
		content: counter(agb-counter) '. ';
	}
</style>
