<script>
	import '$lib/boilerplate/components/XioniEventTile/XioniEventTile.scss'

	const { events } = $$props.data

	let expandedElement = null
</script>

<h1>Events <i>(Toggle)</i></h1>

<Client browser>
	<ol class="$flex $flex-column $gap">
		{#each events as event}
			<li class="XioniEventTile">
				{#if event.image}
					<img
						class="XioniEventTile__image"
						src={event.image.thumbSrc}
						alt={event.image.alt}
						loading="lazy" />
				{/if}

				<h2 class="XioniEventTile__title">
					{event.title}
				</h2>

				<h3 class="XioniEventTile__date">
					{event.duration}
				</h3>

				<div class="XioniEventTile__description">
					{@html event.description}
				</div>

				{#if expandedElement === event.id}
					<div class="XioniEventTile__details">
						{@html event.details}
					</div>

					<div class="XioniEventTile__metadata">
						{#if event.ticketshop}
							<Link to={event.ticketshop.toString()} icon="fas fa-ticket-alt">Zum Ticketshop</Link>
						{/if}

						{#if event.website}
							<Link to={event.website.toString()} icon="fas fa-globe" />
						{/if}

						{#if event.pdf}
							<Link to={event.pdf.src} icon="fas fa-file-pdf">{event.pdf.title}</Link>
						{/if}
					</div>

					{#if event.images}
						<Grid gap class="$mt">
							{#each event.images as { src, alt }}
								<Grid size="tablet-1-5">
									<img {src} {alt} loading="lazy" />
								</Grid>
							{/each}
						</Grid>
					{/if}

					<Link
						icon="fas fa-angle-up"
						class="$row-reverse $mt"
						on:click={() => (expandedElement = null)}>Weniger</Link>
				{:else}
					<Link
						icon="fas fa-angle-down"
						class="$row-reverse"
						on:click={() => (expandedElement = event.id)}>
						Mehr erfahren
					</Link>
				{/if}
			</li>
		{/each}
	</ol>
</Client>
