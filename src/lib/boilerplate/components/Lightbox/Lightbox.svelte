<script lang="ts">
	import './Lightbox.scss'
	import { onMount } from 'svelte'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import Modal from '../Modal/Modal.svelte'
	import Fontello from '../Fontello/Fontello.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let images: {
		src: string
		alt: string
	}[] = []

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let lightbox: HTMLElement
	let modal: Modal
	let lightboxImages = images
	let index = -1

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

	function slideForward() {
		index = index + 1 >= lightboxImages.length ? 0 : index + 1
	}

	function slideBack() {
		index = index === 0 ? lightboxImages.length - 1 : index - 1
	}

	// Init
	onMount(getImages)
</script>

<div class="Lightbox" bind:this={lightbox}>
	<slot />
</div>
<Modal class="Lightbox__modal" bind:this={modal}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="Lightbox__navigate Lightbox__navigate--prev"
		class:$invisible={!(lightboxImages.length > 2)}
		on:keydown
		on:click={slideBack}>
		<Fontello name="left-open" />
	</div>

	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="Lightbox__navigate Lightbox__navigate--next"
		class:$invisible={!(lightboxImages.length > 2)}
		on:keydown
		on:click={slideForward}>
		<Fontello name="right-open" />
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

{#each lightboxImages as { src, alt }}
	<img {src} {alt} hidden aria-hidden loading="lazy" />
{/each}
