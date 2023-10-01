<script lang="ts">
	import './Swiper.scss'

	import { onMount } from 'svelte'
	import { uniqueId } from 'lodash-es'
	import classnames from 'classnames'
	// @ts-ignore missing declaration
	import Glide from '@glidejs/glide/dist/glide.esm'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let autoplay: number = 0
	export let focusAt: 'center' | number = 'center'
	export let gap: number = 0
	export let images: { src: string; alt: string }[] | undefined = undefined
	export let perView: number = 1
	export let speed: number = 1500 // animationDuration
	export let startAt: number = 0
	export let type: 'slider' | 'carousel' = 'carousel'
	export let nav: boolean = true
	export let config: object | undefined = undefined // Optional full config model
	export let baseName = 'Swiper'

	// -----------------------------------------------------------------------------------------------

	let slider: HTMLElement
	let swiper: any

	const id = uniqueId('swiper-')
	const glideConfig = config || {
		autoplay,
		focusAt,
		gap,
		perView,
		animationDuration: speed || 1500,
		startAt,
		type
	}

	onMount(() => {
		swiper = new Glide('#' + id, glideConfig)
		slider
			.querySelectorAll('.glide__slides > *')
			.forEach(slide => slide.classList.add('glide__slide'))
		swiper.mount()
	})
</script>

<div {id} class={classnames(baseName, $$props.class, 'glide')} bind:this={slider}>
	<div class="glide__track" data-glide-el="track">
		<div class="glide__slides">
			{#if images && images.length}
				{#each images as { src, alt }}
					<img {src} {alt} />
				{/each}
			{:else}
				<slot />
			{/if}
		</div>
	</div>
	{#if nav}
		<button
			aria-label="Vorheriges Bild zeigen"
			class={`${baseName}__button ${baseName}__button--prev`}
			on:click={() => swiper.go('<')}>
			<Icon ex-class={`${baseName}__button-icon`} name="fas fa-angle-left" size="5" />
		</button>
		<button
			aria-label="Nächstes Bild zeigen"
			class={`${baseName}__button ${baseName}__button--next`}
			on:click={() => swiper.go('>')}>
			<Icon ex-class={`${baseName}__button-icon`} name="fas fa-angle-right" size="5" />
		</button>
	{/if}
</div>
