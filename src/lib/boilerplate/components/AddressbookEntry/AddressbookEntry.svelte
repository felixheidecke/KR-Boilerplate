<script lang="ts">
	import './AddressbookEntry.scss'
	import classNames from 'classnames'
	import Address from '../Address/Address.svelte'
	import type { AddressbookEntryProps } from './AddressbookEntry'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		tag = 'div',
		baseName = 'AddressbookEntry',
		class: className,
		entry
	}: AddressbookEntryProps = $props()

	let address = $derived({
		street: entry.address || undefined,
		town: entry.city || undefined,
		phone: entry.phone || undefined,
		mobile: entry.mobile || undefined,
		fax: entry.fax || undefined,
		email: entry.email || undefined,
		web: entry.web || undefined
	})

	let hasAddress = $derived(Object.entries(address).some(e => !!e))
</script>

<svelte:element this={tag} class={classNames(baseName, className)}>
	<div class="{baseName}__title">
		{entry.title}
	</div>
	<div class="{baseName}__subtitle">
		{entry.subtitle}
	</div>
	<div class="{baseName}__description">
		{@html entry.description}
	</div>
	{#if hasAddress}
		<Address {...address} class="{baseName}__address">
			<li class="Address__room">
				{entry.room}
			</li>
		</Address>
	{/if}
</svelte:element>
