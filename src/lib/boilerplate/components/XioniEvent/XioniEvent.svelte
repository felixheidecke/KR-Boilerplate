<script lang="ts">
	import './XioniEvent.scss'

	import { formatFromTo } from '$lib/boilerplate/utils/format-date'
	import { formatISO } from 'date-fns'
	import classnames from 'classnames'
	import { createEventDispatcher } from 'svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/events.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Picture from '../Picture/Picture.svelte'
	import Grid from '../Grid/Grid.svelte'
	import Lightbox from '../Lightbox/Lightbox.svelte'
	import ButtonRow from '../ButtonRow/ButtonRow.svelte'
	import Button from '../Button/Button.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const {
		description,
		details,
		ends,
		image,
		pdf,
		flags,
		starts,
		title,
		website,
		ticketshop,
		organizer
	} = $$props.event as XioniEvent

	const images = $$props.event.images || []

	// -----------------------------------------------------------------------------------------------

	let lightbox: Lightbox // ref

	const emit = createEventDispatcher()
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

<div class={className} itemscope itemtype="https://schema.org/Event">
	<meta itemprop="startDate" content={formatISO(starts, { representation: 'date' })} />
	<meta itemprop="endDate" content={formatISO(starts, { representation: 'date' })} />
	<meta itemprop="organizer" content={organizer} />

	{#if image || images?.length}
		<div class="{baseName}__image-wrapper">
			{#if image}
				<Picture
					ex-class={baseName + '__image'}
					src={image.src}
					tablet={image.src}
					alt={image.alt} />
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
								on:click={() => lightbox.open(index)} />
						</Grid>
					{/each}
					{#if images.length > maxImages}
						<Grid size="1-5" class="$mt">
							<div
								class={baseName + '__piucture-row-overflow-indicator $pointer'}
								on:click={() => lightbox.open(4)}>
								+{images.length - maxImages}
							</div>
						</Grid>
					{/if}
				</Grid>
			{/if}
		</div>
	{/if}

	<h2 itemprop="name" class={baseName + '__title'}>
		{title}
	</h2>

	<h3 class={baseName + '__date'}>
		<date datetime={starts.toDateString()}>
			{@html formatFromTo(starts, ends)}
		</date>
	</h3>

	{#if description}
		<div itemprop="description" class={baseName + '__description'}>
			{@html description}
		</div>
	{/if}

	{#if details}
		<div class={baseName + '__content'}>
			{@html details}
		</div>
	{/if}

	<ButtonRow class={baseName + '__metadata'}>
		{#if allowRegistration}
			<Button
				icon="fas fa-ticket-alt"
				on:click={() => emit('click', 'registration')}
				class={baseName + '__registration'}>Jetzt anmelden</Button>
		{/if}

		{#if ticketshop && !allowRegistration}
			<Button
				to={ticketshop.toString()}
				on:click={() => emit('click', 'ticketshop')}
				icon="fas fa-ticket-alt">Zum Ticketshop</Button>
		{/if}

		{#if website}
			<Button icon="fas fa-globe" on:click={() => emit('click', 'website')} to={website.toString()}
				>{website.hostname}</Button>
		{/if}

		{#if pdf}
			<Button icon="fas fa-file-pdf" to={pdf.src}>{pdf.title}</Button>
		{/if}
	</ButtonRow>
</div>
