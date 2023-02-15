<script lang="ts">
	import './Link.css'
	import classnames from 'classnames'

	// --- Components --------------------------------------------------------------------------------

	import Icon from '../icon/icon.svelte'

	// --- Props -------------------------------------------------------------------------------------

	export let to: string
	export let target: '_self' | '_blank' | undefined = undefined
	export let icon: string | undefined = undefined
	export let rel: 'no-follow' | 'follow' = 'follow'
	export let tag: 'a' | 'button' = 'a'

	// --- Methods -----------------------------------------------------------------------------------

	export const isExternalLink = (link: string) => {
		return !link.search(/(http(s)?|ftp):\/\//) || !link.indexOf('//')
	}

	const trimScheme = (link: string) => {
		if (!isExternalLink(link)) return link

		const { hostname } = new URL(link)
		return hostname
	}

	// --- Data --------------------------------------------------------------------------------------

	if (isExternalLink(to)) {
		rel = 'no-follow'
		target = '_blank'
	}

	const baseName = $$props['ex-class'] || 'Link'

	$: className = classnames(
		baseName,
		$$props.class,
		!icon || baseName + '--has-icon',
		isExternalLink(to) ? baseName + '--external' : baseName + '--internal'
	)
</script>

{#if icon}
	<span class={className}>
		<Icon ex-class={baseName + '__icon'} name={icon} />
		<svelte:element this={tag} href={to} {target} {rel} on:click>
			{#if $$slots.default}
				<slot />
			{:else}
				{trimScheme(to)}
			{/if}
		</svelte:element>
	</span>
{:else}
	<svelte:element this={tag} class={className} href={to} {target} {rel} on:click>
		{#if $$slots.default}
			<slot />
		{:else}
			{trimScheme(to)}
		{/if}
	</svelte:element>
{/if}
