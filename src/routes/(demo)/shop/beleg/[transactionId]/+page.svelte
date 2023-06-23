<script lang="ts">
	import { LOCALE } from '$lib/boilerplate/constants'

	import Address from '$lib/boilerplate/components/Address/Address.svelte'
	import Grid from '$lib/boilerplate/components/Grid/Grid.svelte'

	import type { AddressProps } from '$lib/boilerplate/components/Address/Address.types'
	import type { ShopRecieptOrder } from '$lib/boilerplate/libraries/xioni-shop/order.types'

	const { reciept } = $$props.data as { reciept: ShopRecieptOrder }

	const address = (): AddressProps => {
		const { address } = reciept

		return {
			title: address.company,
			name: `${address.salutation} ${address.firstname} ${address.name}`,
			street: address.address,
			town: `${address.zip} ${address.city}`
		}
	}
</script>

<h1>Bestellbeleg</h1>

<Grid>
	<Grid size="1-2">
		An:<br />
		<Address {...address()} />
	</Grid>
	<Grid size="1-2" class="$text-right">
		Datum: {reciept.date.toLocaleDateString(LOCALE)}
	</Grid>
	<Grid size="1">
		<ul class="$mt">
			{#each reciept.products as product}
				<li>
					{product.quantity} &times; {product.name}
				</li>
			{/each}
		</ul>
	</Grid>
</Grid>

<pre>
  {JSON.stringify(reciept, null, 2)}
</pre>
