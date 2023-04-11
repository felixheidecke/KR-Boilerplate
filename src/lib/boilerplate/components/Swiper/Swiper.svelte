<script lang="ts">
	import './swiper.scss'
	import { onMount } from 'svelte'
	import { uniqueId } from 'lodash-es'
	import classnames from 'classnames'
	import Glide from '@glidejs/glide'

	// --- [ Types ] ---------------------------------------------------------------------------------

	import type { SwiperProps } from './Swiper.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Icon from '../Icon/Icon.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let autoplay: SwiperProps['autoplay'] = 0
	export let focusAt: SwiperProps['focusAt'] = 'center'
	export let gap: SwiperProps['gap'] = 0
	export let images: SwiperProps['images'] = undefined
	export let perView: SwiperProps['perView'] = 1
	export let speed: SwiperProps['speed'] = 1500 // animationDuration
	export let startAt: SwiperProps['startAt'] = 0
	export let type: SwiperProps['type'] = 'carousel'
	export let nav: SwiperProps['nav'] = true
	export let config: SwiperProps['config'] = undefined // Optional full config model
	export let exClass: SwiperProps['exClass'] = undefined

	// --- [ Logic ] ---------------------------------------------------------------------------------

	let slider: HTMLElement
	let swiper: any

	const baseName = exClass || 'Swiper'
	const className = classnames(baseName, $$props.class, 'glide')
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

<div {id} class={className} bind:this={slider}>
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
