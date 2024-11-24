<script lang="ts">
	import './Link.css'
	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'
	import Icon from '../Icon/Icon.svelte'
	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string | undefined = undefined
	export let target: '_blank' | undefined = undefined
	export let icon: string = ''
	export let fontello: string = ''
	export let rel: string = 'follow'
	export let label: string = ''
	export let exClass: string | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	const tag = to ? 'a' : 'span'
	const baseName = exClass || 'Link'
	const className = classnames(baseName, $$props.class, !icon || baseName + '--has-icon')

	if (to && isExternalURL(to)) {
		rel = 'nofollow'
		target = '_blank'
	}

	function trimScheme(link: typeof to) {
		if (!link) return ''

		if (!isExternalURL(link)) return link

		const { hostname } = new URL(link)
		return hostname
	}
</script>

{#if icon || fontello}
	<span class={className}>
		{#if icon}
			<Icon baseName={baseName + '__icon'} name={icon} />
		{:else if fontello}
			<Fontello class={baseName + '__icon'} name={fontello} />
		{/if}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<svelte:element this={tag} href={to} {target} {rel} aria-label={label} on:click>
			{#if $$slots.default}
				<slot />
			{:else}
				{trimScheme(to)}
			{/if}
		</svelte:element>
	</span>
{:else}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svelte:element this={tag} class={className} href={to} {target} {rel} aria-label={label} on:click>
		{#if $$slots.default}
			<slot />
		{:else}
			{trimScheme(to)}
		{/if}
	</svelte:element>
{/if}
