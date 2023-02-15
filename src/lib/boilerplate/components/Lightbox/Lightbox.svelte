<script lang="ts">
	import './lightbox.scss'
	import { onMount } from 'svelte'
	import Icon from '../icon/icon.svelte'
	import Modal from '../modal/modal.svelte'

	// Refs
	let lightbox: HTMLElement
	let modal: Modal

	// --- Data -------------------------

	export let images: { src: string; alt: string }[] = []

	let index = 0
	let isMobile = true

	$: activeImage = images[index] || {}

	// --- Methods ----------------------

	export function open(i: number = -1): void {
		if (i >= 0) index = i

		modal.open()
	}

	function getImages() {
		lightbox.querySelectorAll('img[data-lightbox]').forEach((image, i) => {
			images = [
				{
					src: image.getAttribute('data-lightbox') || '',
					alt: image.getAttribute('alt') || ''
				}
			]

			image.addEventListener('click', () => {
				index = i

				modal.open()
			})
		})
	}

	function navigate(dir: '>' | '<') {
		if (dir === '>') {
			index = index + 1 >= images.length ? 0 : index + 1
			return
		}
		if (dir === '<') {
			index = index === 0 ? images.length - 1 : index - 1
			return
		}
	}

	// Init
	onMount(() => {
		if (window.innerWidth < 620 || images.length) return

		getImages()
		isMobile = false
	})
</script>

<div class="Lightbox">
	<div bind:this={lightbox}>
		<slot />
	</div>
	<Modal bind:this={modal}>
		<div
			class="Lightbox__navigate Lightbox__navigate--prev"
			class:$invisible={!(images.length > 2)}
			on:click={() => navigate('<')}
		>
			<Icon name="fas fa-angle-left" size="2" />
		</div>

		<div
			class="Lightbox__navigate Lightbox__navigate--next"
			class:$invisible={!(images.length > 2)}
			on:click={() => navigate('>')}
		>
			<Icon name="fas fa-angle-right" size="2" />
		</div>

		{#if activeImage.alt}
			<div class="Lightbox__textbox">
				<p class="$m-0">
					{activeImage.alt}
				</p>
			</div>
		{/if}
		<img class="Lightbox__active-image" src={activeImage.src} alt={activeImage.alt} />
	</Modal>

	{#if !isMobile}
		{#each images as { src, alt }}
			<img {src} {alt} hidden aria-hidden />
		{/each}
	{/if}
</div>
