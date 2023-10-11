<script lang="ts">
	import './Address.css'
	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Link from '../Link/Link.svelte'
	import Mail from '../Mail/Mail.svelte'
	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let name: string
	export let title = ''
	export let owner = ''
	export let street: string
	export let town: string
	export let phone = ''
	export let fax = ''
	export let email = ''
	export let web = ''
	export let baseName = 'Address'

	// -----------------------------------------------------------------------------------------------
</script>

<ol {...$$restProps} class={classnames(baseName, $$props.class)}>
	<li class="{baseName}__name">{name}</li>
	{#if title}
		<li class="{baseName}__title">{title}</li>
	{/if}
	{#if owner}
		<li class="{baseName}__owner">{owner}</li>
	{/if}
	<li class="{baseName}__street">{street}</li>
	<li class="{baseName}__town">{town}</li>
	<slot />
	{#if phone}
		<li class="{baseName}__phone">
			<Link icon="fas fa-phone-alt" to={'tel://' + phone}>{phone}</Link>
		</li>
	{/if}
	{#if fax}
		<li class="{baseName}__fax">
			<Icon name="fas fa-fax" />
			{fax}
		</li>
	{/if}
	{#if email}
		<li class="{baseName}__email">
			<Mail to={email} />
		</li>
	{/if}
	{#if web}
		<li class="{baseName}__web">
			<Link icon="fas fa-globe" to="https://{web}" />
		</li>
	{/if}
</ol>
