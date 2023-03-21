<script lang="ts">
	import './XioniEvent.scss'
	import { formatFromTo } from '$lib/boilerplate/utils/format-date'
	import { getContext } from 'svelte'
	import classnames from 'classnames'
	import type { Writable } from 'svelte/store'
	import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/event.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Picture from '../Picture/Picture.svelte'
	import Link from '../Link/Link.svelte'
	import Icon from '../Icon/Icon.svelte'
	import Grid from '../Grid/Grid.svelte'
	import Lightbox from '../Lightbox/Lightbox.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const { id, description, details, ends, image, pdf, flags, starts, title, website, ticketshop } =
		$$props.event as XioniEvent

	const images = $$props.event.images || []

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let lightbox: Lightbox // ref

	const activeEvent = getContext('active-xioni-event') as Writable<XioniEvent | null>
	const allowRegistration = flags ? flags.includes('Anmeldung') : false

	// Classname
	const baseName = $$props['ex-class'] || 'XioniEvent'
	const className = classnames(baseName, $$props.class)

	// Images
	const maxImages = 5
	const imageRow = (function () {
		if (images.length === maxImages) {
			return [...images].splice(0, maxImages)
		} else if ([...images].length > maxImages) {
			return [...images].splice(0, maxImages - 1)
		} else {
			return images
		}
	})()
</script>

{#if images.length}
	<Lightbox bind:this={lightbox} {images} />
{/if}

<div class={className} id={'xioni-event-' + id}>
	{#if image || images?.length}
		<div class="{baseName}__image-wrapper">
			{#if image}
				<Picture
					ex-class={baseName + '__image'}
					src={image.src}
					tablet={image.src}
					alt={image.alt}
				/>
			{/if}
			{#if images.length}
				<Grid gap>
					{#each imageRow as { src, alt }, index}
						<Grid size="1-5" class="$mt">
							<img
								class={baseName + '__piucture-row-image $pointer'}
								{src}
								{alt}
								loading="lazy"
								on:click={() => lightbox.open(index)}
							/>
						</Grid>
					{/each}
					{#if images.length > maxImages}
						<Grid size="1-5" class="$mt">
							<div
								class={baseName + '__piucture-row-overflow-indicator $pointer'}
								on:click={() => lightbox.open(4)}
							>
								+{images.length - maxImages}
							</div>
						</Grid>
					{/if}
				</Grid>
			{/if}
		</div>
	{/if}

	<h2 class={baseName + '__title'}>
		{title}
	</h2>

	<h3 class={baseName + '__date'}>
		<date datetime={starts.toDateString()}>
			{@html formatFromTo(starts, ends)}
		</date>
	</h3>

	<div class={baseName + '__description'}>
		{@html description}
	</div>

	{#if details}
		<div class={baseName + '__content'}>
			{@html details}
		</div>
	{/if}

	<ul class={baseName + '__metadata'}>
		{#if allowRegistration}
			<li on:click={() => activeEvent.set($$props.event)} class={baseName + '__registration'}>
				<Icon name="fas fa-ticket-alt" class="$mr-1/2" />
				<span class="$underline $pointer">Jetzt anmelden</span>
			</li>
		{/if}

		{#if ticketshop && !allowRegistration}
			<li class={baseName + '__ticketshop'}>
				<Link to={ticketshop.toString()} icon="fas fa-ticket-alt">Zum Ticketshop</Link>
			</li>
		{/if}

		{#if website}
			<li class={baseName + '__website'}>
				<Link icon="fas fa-globe" to={website.toString()} />
			</li>
		{/if}

		{#if pdf}
			<li class={baseName + '__pdf'}>
				<Link icon="fas fa-file-pdf" to={pdf.src}>{pdf.title}</Link>
			</li>
		{/if}
	</ul>
</div>
