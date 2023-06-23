<script>
	import Address from '$lib/boilerplate/components/Address/Address.svelte'
	import { INVOICE_ADDRESS, SHIPPING_ADDRESS } from '../stores'

	function invoiceAddress() {
		const { company, salutation, firstname, name, address, zip, city, phone, email } =
			$INVOICE_ADDRESS

		return {
			name: company,
			title: `${salutation} ${firstname} ${name}`,
			street: address,
			town: `${zip} ${city}`,
			phone,
			email
		}
	}
</script>

<h1 class="h2">Zusammenfassung</h1>

<p>Bitte überprüfen Sie die Daten auf Richtigkeit, bevor Sie die Bestellung abschließen.</p>

<p />

<Address {...invoiceAddress} />
