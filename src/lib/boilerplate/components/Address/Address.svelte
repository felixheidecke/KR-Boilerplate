<script lang="ts">
	import './Address.css'

	import Link from '../Link/Link.svelte'
	import Mail from '../Mail/Mail.svelte'

	import type { AddressProps } from './Address.types'

	export let name: AddressProps['name']
	export let title: AddressProps['title'] = ''
	export let street: AddressProps['street']
	export let town: AddressProps['town']
	export let phone: AddressProps['phone'] = ''
	export let email: AddressProps['email'] = ''
	export let web: AddressProps['web'] = ''
</script>

<ol class="Address">
	<li class="Address__name">{name}</li>
	{#if phone}
		<li class="Address__title">{title}</li>
	{/if}
	<li class="Address__street">{street}</li>
	<li class="Address__town">{town}</li>
	<slot />
	{#if phone}
		<li class="Address__phone">
			<Link icon="fas fa-phone-alt" to={'tel://' + phone}>{phone}</Link>
		</li>
	{/if}
	{#if email}
		<li class="Address__email">
			<Mail to={email} />
		</li>
	{/if}
	{#if web}
		<li class="Address__web">
			<Link icon="fas fa-globe" to={web} />
		</li>
	{/if}
</ol>
