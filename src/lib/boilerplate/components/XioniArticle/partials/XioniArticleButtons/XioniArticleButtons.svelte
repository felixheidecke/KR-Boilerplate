<script lang="ts">
	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import ButtonRow from '../../../ButtonRow/ButtonRow.svelte'
	import Button from '../../../Button/Button.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let pdf: XioniCMS.Article['pdf']
	export let website: XioniCMS.Article['website']
	export let baseName = 'XioniArticleButtons'

	// -----------------------------------------------------------------------------------------------
</script>

<ButtonRow class={baseName}>
	{#if pdf}
		<Button to={pdf.src} class="{baseName}__pdf" fontello="file-pdf">
			{pdf.title}
		</Button>
	{/if}

	{#if website}
		<Button to={website.toString()} class="{baseName}__website" fontello="link">
			{website.host}
		</Button>
	{/if}
</ButtonRow>
