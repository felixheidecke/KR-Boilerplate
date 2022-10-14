<script>
  import classnames from 'classnames'
  import { onMount } from 'svelte'
  import { uniqueId } from 'lodash-es'
  import Glide from '@glidejs/glide'

  // Components
  import Icon from './Icon.svelte'
  import { isTrue } from '@/js/utils'

  let slider

  // Props
  export let autoplay = 0
  export let focusAt = 'center'
  export let gap = 0
  export let hoverpause = true
  export let perView = 1
  export let speed = 1000 // animationDuration
  export let startAt = 0
  export let type = 'carousel'
  export let images = []

  export let nav = true
  export let config = null // Optional full config model

  const id = uniqueId('swiper-')

  const glideConfig = config || {
    autoplay: +autoplay,
    focusAt,
    gap: +gap,
    hoverpause: isTrue(hoverpause),
    perView: +perView,
    animationDuration: +speed,
    startAt: +startAt,
    type
  }

  const swiper = new Glide('#' + id, glideConfig)

  onMount(() => {
    slider
      .querySelectorAll('.glide__slides > *')
      .forEach((slide) => slide.classList.add('glide__slide'))
    swiper.mount()
  })

  const baseName = $$props['ex-class'] || 'Swiper'

  $: className = classnames(baseName, $$props.class, 'glide')
</script>

<div {id} class={className} bind:this={slider}>
  <div class="glide__track" data-glide-el="track">
    <div class="glide__slides">
      {#if images.length}
        {#each images as { src, alt }}
          <img {src} {alt} />
        {/each}
      {:else}
        <slot />
      {/if}
    </div>
  </div>
  {#if isTrue(nav)}
    <button
      aria-label="Vorheriges Bild zeigen"
      class={`${baseName}__button ${baseName}__button--prev`}
      on:click={() => swiper.go('<')}
    >
      <Icon ex-class={`${baseName}__button-icon`} name="fas fa-angle-left" size="5" />
    </button>
    <button
      aria-label="Nächstes Bild zeigen"
      class={`${baseName}__button ${baseName}__button--next`}
      on:click={() => swiper.go('>')}
    >
      <Icon ex-class={`${baseName}__button-icon`} name="fas fa-angle-right" size="5" />
    </button>
  {/if}
</div>

<style lang="scss" global>
  @import '../../node_modules/@glidejs/glide/dist/css/glide.core.min.css';

  :where(.Swiper) {
    overflow: hidden;
  }

  :where(.Swiper__button) {
    padding: 4rem;
    border: 0 none;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    color: white;
    transition: transform 0.33s, opacity 0.33s;
  }

  :where(.Swiper__button--prev) {
    background: linear-gradient(90deg, rgba(black, 0.25) 0%, transparent 100%);
    left: 0;

    &:not(:hover) {
      transform: translateX(-33.333%);
      opacity: 0;
    }
  }

  :where(.Swiper__button--next) {
    background: linear-gradient(-90deg, rgba(black, 0.25) 0%, transparent 100%);
    right: 0;

    &:not(:hover) {
      transform: translateX(33.333%);
      opacity: 0;
    }
  }
</style>
