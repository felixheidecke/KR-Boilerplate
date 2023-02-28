<script lang="ts">
	import './XioniEvent.scss'
	import { formatFromTo } from '$lib/boilerplate/utils/format-date'
	import { getContext } from 'svelte'
	import classnames from 'classnames'
	import type { Writable } from 'svelte/store'
	import type { XioniEvent } from '$lib/boilerplate/libraries/xioni/event.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Picture from '../picture/picture.svelte'
	import Link from '../link/link.svelte'
	import Icon from '../icon/icon.svelte'
	import Grid from '../grid/grid.svelte'
	import Lightbox from '../lightbox/lightbox.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	const {
		description,
		details,
		ends,
		image,
		images,
		pdf,
		starts,
		title,
		website,
		ticketshop,
		flags
	} = $$props.event as XioniEvent

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let lightbox: Lightbox // ref

	const activeEvent = getContext('active-xioni-event') as Writable<XioniEvent | null>
	const allowRegistration = flags.includes('Anmeldung')

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

{#if images}
	<Lightbox bind:this={lightbox} {images} />
{/if}

<div class={className}>
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

	<h1 class={baseName + '__title'}>
		{title}
	</h1>

	<div class={baseName + '__description'}>
		{@html description}
	</div>

	<ul class={baseName + '__info-list'}>
		<li class={baseName + '__info-list-item'}>
			<Icon name="fas fa-calendar" class="$mr-1/2" />
			<date class="$font-italic">
				{@html formatFromTo(starts, ends)}
			</date>
		</li>

		{#if allowRegistration}
			<li on:click={() => activeEvent.set($$props.event)}>
				<Icon name="fas fa-ticket-alt" class="$mr-1/2" />
				<span class="$underline $pointer">Jetzt anmelden</span>
			</li>
		{/if}

		{#if ticketshop && !allowRegistration}
			<li class={baseName + '__info-list-item'}>
				<Link to={ticketshop.toString()} class={baseName + '__ticketshop'} icon="fas fa-ticket-alt">
					Zum Ticketshop
				</Link>
			</li>
		{/if}

		{#if website}
			<li class={baseName + '__info-list-item'}>
				<Link icon="fas fa-globe" to={website.toString()} />
			</li>
		{/if}

		{#if pdf}
			<li class={baseName + '__info-list-item'}>
				<Link to={pdf.src} target="_blank" icon="fas fa-file-pdf">
					{pdf.title}
				</Link>
			</li>
		{/if}
	</ul>

	{#if details}
		<div class={baseName + '__details'}>
			{@html details}
		</div>
	{/if}
	<slot />
</div>