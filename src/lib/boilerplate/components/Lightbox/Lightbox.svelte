<script lang="ts">
	import './Lightbox.scss'

	import { onMount } from 'svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { LightboxProps } from './Lightbox.types'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'
	import Modal from '../Modal/Modal.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let images = [] as LightboxProps['images']

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let lightbox: HTMLElement
	let modal: Modal
	let lightboxImages = images
	let index = -1
	let isMobile = true

	$: activeImage = lightboxImages[index] || {}

	export function open(i: number = -1): void {
		if (i >= 0) index = i

		modal.open()
	}

	function getImages() {
		lightbox.querySelectorAll('img[data-lightbox]').forEach((image, i) => {
			lightboxImages.push({
				src: image.getAttribute('data-lightbox') || '',
				alt: image.getAttribute('alt') || ''
			})

			image.addEventListener('click', () => open(i))
		})
	}

	function navigate(dir: '>' | '<') {
		if (dir === '>') {
			index = index + 1 >= lightboxImages.length ? 0 : index + 1
			return
		}
		if (dir === '<') {
			index = index === 0 ? lightboxImages.length - 1 : index - 1
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
			class:$invisible={!(lightboxImages.length > 2)}
			on:click={() => navigate('<')}>
			<Icon name="fas fa-angle-left" size="2" />
		</div>

		<div
			class="Lightbox__navigate Lightbox__navigate--next"
			class:$invisible={!(lightboxImages.length > 2)}
			on:click={() => navigate('>')}>
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
		{#each lightboxImages as { src, alt }}
			<img {src} {alt} hidden aria-hidden />
		{/each}
	{/if}
</div>
