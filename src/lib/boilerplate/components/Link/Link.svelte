<script lang="ts">
	import './Link.css'
	import classnames from 'classnames'
	import isExternalURL from '$lib/boilerplate/utils/isExternalURL'
	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let to: string | undefined = undefined
	export let target: '_blank' | undefined = undefined
	export let fontello: string = ''
	export let rel: 'follow' | 'nofollow noopener' = 'nofollow noopener'
	export let label: string = ''
	export let exClass: string | undefined = undefined

	// -----------------------------------------------------------------------------------------------

	const tag = to ? 'a' : 'span'
	const baseName = exClass || 'Link'
	const className = classnames(baseName, $$props.class, !fontello || baseName + '--has-icon')

	if (to && isExternalURL(to)) {
		rel = 'nofollow noopener'
		target = '_blank'
	}

	function trimScheme(link: typeof to) {
		if (!link) return ''

		if (!isExternalURL(link)) return link

		const { hostname } = new URL(link)
		return hostname
	}
</script>

{#if fontello}
	<span class={className}>
		{#if fontello}
			<Fontello class={baseName + '__icon'} name={fontello} />&nbsp;
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
