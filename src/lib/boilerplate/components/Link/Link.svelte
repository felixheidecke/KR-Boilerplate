<script lang="ts">
	import './Link.css'
	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import { LinkPropsRel, LinkPropsTag, LinkPropsTarget, type LinkProps } from './Link.types'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: LinkProps['to'] = ''
	export let target: LinkProps['target'] = undefined
	export let icon: LinkProps['icon'] = undefined
	export let rel: LinkProps['rel'] = LinkPropsRel.FOLLOW
	export let tag: LinkProps['tag'] = LinkPropsTag.ANCHOR
	export let exClass = undefined

	const href = to || undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	if (isExternalLink(to)) {
		rel = LinkPropsRel.NO_REFERRER
		target = LinkPropsTarget.BLANK
	}

	const baseName = exClass || 'Link'
	const className = classnames(
		baseName,
		$$props.class,
		!icon || baseName + '--has-icon',
		isExternalLink(to) ? baseName + '--external' : baseName + '--internal'
	)

	function isExternalLink(link: string) {
		return link.startsWith('https://') || link.startsWith('http://')
	}

	function trimScheme(link: string) {
		if (!isExternalLink(link)) return link

		const { hostname } = new URL(link)
		return hostname
	}
</script>

{#if icon}
	<span class={className}>
		<Icon ex-class={baseName + '__icon'} name={icon} />
		<svelte:element this={tag} {href} {target} {rel} on:click>
			{#if $$slots.default}
				<slot />
			{:else}
				{trimScheme(to)}
			{/if}
		</svelte:element>
	</span>
{:else}
	<svelte:element this={tag} class={className} {href} {target} {rel} on:click>
		{#if $$slots.default}
			<slot />
		{:else}
			{trimScheme(to)}
		{/if}
	</svelte:element>
{/if}
