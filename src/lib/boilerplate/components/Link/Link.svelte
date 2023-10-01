<script lang="ts">
	import './Link.css'
	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string | undefined = undefined
	export let target: '_blank' | undefined = undefined
	export let icon: string = ''
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

{#if icon}
	<span class={className}>
		<Icon ex-class={baseName + '__icon'} name={icon} />
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
