<script lang="ts">
	import './XioniEvent.scss'

	import { createEventDispatcher } from 'svelte'
	import { formatFromTo } from '$lib/boilerplate/utils/formatDate'
	import { formatISO } from 'date-fns'
	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { XioniCMS } from '$lib/boilerplate/xioni/types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Picture from '../Picture/Picture.svelte'
	import Grid from '../Grid/Grid.svelte'
	import Lightbox from '../Lightbox/Lightbox.svelte'
	import ButtonRow from '../ButtonRow/ButtonRow.svelte'
	import Button from '../Button/Button.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let baseName = 'XioniEvent'
	export let event: XioniCMS.Event

	// -----------------------------------------------------------------------------------------------

	let lightbox: Lightbox // ref
	const { teaser, description, endDate, image, flags, startDate, title, organizer } = event
	const images = event.images || []
	const emit = createEventDispatcher()
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
	{...$$restProps}
	class={classnames(baseName, $$props.class)}>
	<meta itemprop="startDate" content={formatISO(startDate, { representation: 'date' })} />
	<meta itemprop="endDate" content={formatISO(endDate, { representation: 'date' })} />
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
					{#each imageRow as { src, description }, index}
						<Grid size="1-5" class="$mt">
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<img
								class={baseName + '__piucture-row-image $pointer'}
								{src}
								alt={description}
								loading="lazy"
								on:click={() => lightbox.open(index)} />
						</Grid>
					{/each}
					{#if images.length > maxImages}
						<Grid size="1-5" class="$mt">
							<!-- svelte-ignore a11y-no-static-element-interactions -->
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
		<date datetime={startDate.toDateString()}>
			{@html formatFromTo(startDate, endDate)}
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
				on:click={() => emit('registrationButtonClick')}
				icon="ticket"
				class={baseName + '__registration'}>Jetzt anmelden</Button>
		{/if}

		{#each event.links as { type, url, title }}
			<Button to={url} icon={type}>{title}</Button>
		{/each}
	</ButtonRow>
</div>
