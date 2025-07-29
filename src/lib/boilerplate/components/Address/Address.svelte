<script lang="ts">
	import './Address.css'
	import classnames from 'classnames'
	import type { AddressProps } from './Address.d'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'
	import Mail from '../Mail/Mail.svelte'
	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------
	let {
		name,
		owner,
		street,
		town,
		phone,
		mobile,
		fax,
		email,
		web,

		class: className,
		baseName = 'Address',
		children
	}: AddressProps = $props()

	// -----------------------------------------------------------------------------------------------
</script>

<ol class={classnames(baseName, className)}>
	{#if name}
		<li class="{baseName}__name">{name}</li>
	{/if}
	{#if owner}
		<li class="{baseName}__owner">{owner}</li>
	{/if}
	{#if street}
		<li class="{baseName}__street">{street}</li>
	{/if}
	{#if town}
		<li class="{baseName}__town">{town}</li>
	{/if}
	{@render children?.()}
	{#if phone}
		<li class="{baseName}__phone">
			<Fontello name="phone" />&nbsp;<a href={'tel:' + phone} aria-label="Telefonnummer anrufen"
				>{phone}</a>
		</li>
	{/if}
	{#if mobile}
		<li class="{baseName}__mobile">
			<Fontello name="phone" />&nbsp;<a href={'tel:' + mobile} aria-label="Mobilnummer anrufen"
				>{mobile}</a>
		</li>
	{/if}
	{#if fax}
		<li class="{baseName}__fax">
			<Fontello name="fax" />&nbsp;{fax}
		</li>
	{/if}
	{#if email}
		<li class="{baseName}__email">
			<Mail to={email} aria-label="E-Mail schreiben" />
		</li>
	{/if}
	{#if web}
		<li class="{baseName}__web">
			<Fontello name="globe" />&nbsp;{web}
		</li>
	{/if}
</ol>
