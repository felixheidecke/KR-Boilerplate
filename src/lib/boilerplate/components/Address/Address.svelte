<script lang="ts">
	import './Address.css'

	import Link from '../Link/Link.svelte'
	import Mail from '../Mail/Mail.svelte'

	import type { AddressProps } from './Address.types'
	import classNames from 'classnames'

	export let name: AddressProps['name']
	export let title: AddressProps['title'] = ''
	export let street: AddressProps['street']
	export let town: AddressProps['town']
	export let phone: AddressProps['phone'] = ''
	export let email: AddressProps['email'] = ''
	export let web: AddressProps['web'] = ''
	export let exClass = ''

	const baseName = exClass || 'Address'
	const className = classNames(baseName, $$props.class)
</script>

<ol class={className}>
	<li class="{baseName}__name">{name}</li>
	{#if phone}
		<li class="{baseName}__title">{title}</li>
	{/if}
	<li class="{baseName}__street">{street}</li>
	<li class="{baseName}__town">{town}</li>
	<slot />
	{#if phone}
		<li class="{baseName}__phone">
			<Link icon="fas fa-phone-alt" to={'tel://' + phone}>{phone}</Link>
		</li>
	{/if}
	{#if email}
		<li class="{baseName}__email">
			<Mail to={email} />
		</li>
	{/if}
	{#if web}
		<li class="{baseName}__web">
			<Link icon="fas fa-globe" to={web} />
		</li>
	{/if}
</ol>
