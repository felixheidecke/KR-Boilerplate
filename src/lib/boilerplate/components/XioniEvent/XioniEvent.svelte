<script lang="ts">
	import './XioniEvent.scss'

	import { formatFromTo } from '$lib/boilerplate/utils/formatDate'
	import { formatISO } from 'date-fns'
	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'
	import type { XioniEventProps } from './XioniEvent'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Picture from '../Picture/Picture.svelte'
	import Grid from '../Grid/Grid.svelte'
	import Lightbox from '../Lightbox/Lightbox.svelte'
	import ButtonRow from '../ButtonRow/ButtonRow.svelte'
	import Button from '../Button/Button.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let {
		baseName = 'XioniEvent',
		class: className,
		event,

		// Events
		registrationClickHandler,
		...restProps
	}: XioniEventProps = $props()

	// -----------------------------------------------------------------------------------------------

	const {
		teaser,
		description,
		ends,
		image,
		pdf,
		flags,
		starts,
		title,
		website,
		ticketshop,
		organizer
	} = event

	let lightbox = $state<Lightbox>()

	const images = event.images || []
	const allowRegistration = flags ? flags.includes('anmeldung') : false
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

<div
	itemscope
	itemtype="https://schema.org/Event"
	{...restProps}
	class={classnames(baseName, className)}>
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
					alt={image.description} />
			{/if}
			{#if images.length}
				<Grid gap>
					{#each imageRow as { src, alt }, index}
						<Grid size="1-5" class="$mt">
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<img
								class={baseName + '__piucture-row-image $pointer'}
								{src}
								{alt}
								loading="lazy"
								onclick={() => lightbox?.open(index)} />
						</Grid>
					{/each}
					{#if images.length > maxImages}
						<Grid size="1-5" class="$mt">
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								class={baseName + '__piucture-row-overflow-indicator $pointer'}
								onclick={() => lightbox?.open(4)}>
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

	{#if teaser}
		<p class={baseName + '__teaser'}>
			{@html teaser}
		</p>
	{/if}

	{#if description}
		<p itemprop="description" class={baseName + '__description'}>
			{@html description}
		</p>
	{/if}

	<ButtonRow class={baseName + '__metadata'}>
		{#if allowRegistration}
			<Button
				fontello="ticket"
				onclick={registrationClickHandler}
				class={baseName + '__registration'}>Jetzt anmelden</Button>
		{/if}

		{#if ticketshop && !allowRegistration}
			<Button to={ticketshop.toString()} fontello="ticket">Zum Ticketshop</Button>
		{/if}

		{#if website}
			<Button fontello="globe" to={website.toString()}>{website.hostname}</Button>
		{/if}

		{#if pdf}
			<Button fontello="file-pdf" to={pdf.src}>{pdf.title}</Button>
		{/if}
	</ButtonRow>
</div>
