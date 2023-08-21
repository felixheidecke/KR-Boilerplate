<script lang="ts">
	import './Address.css'
	import classNames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'
	import Mail from '../Mail/Mail.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let name: string
	export let title = ''
	export let street: string
	export let town: string
	export let phone = ''
	export let email = ''
	export let web = ''
	export let exClass = ''

	// -----------------------------------------------------------------------------------------------

	const baseName = exClass || 'Address'
	const className = classNames(baseName, $$props.class)
</script>

<ol class={className}>
	<li class="{baseName}__name">{name}</li>
	{#if title}
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
