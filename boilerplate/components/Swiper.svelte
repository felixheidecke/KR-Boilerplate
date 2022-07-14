<script>
  import classnames from 'classnames';
  import { onMount } from 'svelte';
  import { uniqueId } from 'lodash-es';
  import Glide from '@glidejs/glide';

  // Components
  import Icon from './Icon.svelte';
  import { isTrue } from '@/js/utils';

  let slider;

  // Props
  export let autoplay = 0;
  export let focusAt = 'center';
  export let gap = 0;
  export let hoverpause = true;
  export let perView = 1;
  export let speed = 1000; // animationDuration
  export let startAt = 0;
  export let type = 'carousel';

  export let nav = true;
  export let config = null; // Optional full config model

  const id = uniqueId('swiper-');

  const glideConfig = config || {
    autoplay: +autoplay,
    focusAt,
    gap: +gap,
    hoverpause: isTrue(hoverpause),
    perView: +perView,
    animationDuration: +speed,
    startAt: +startAt,
    type
  };

  const swiper = new Glide('#' + id, glideConfig);

  onMount(() => {
    slider
      .querySelectorAll('.glide__slides > *')
      .forEach((slide) => slide.classList.add('glide__slide'));
    swiper.mount();
  });

  const baseName = $$props['ex-class'] || 'Swiper';

  $: className = classnames(baseName, $$props.class, 'glide');
</script>

<div {id} class={className} bind:this={slider}>
  <div class="glide__track" data-glide-el="track">
    <div class="glide__slides">
      <slot />
    </div>
  </div>
  {#if isTrue(nav)}
    <button
      class={`${baseName}__button ${baseName}__button--prev`}
      on:click={() => swiper.go('<')}
    >
      <Icon name="fas fa-angle-left" size="3" />
    </button>
    <button
      class={`${baseName}__button ${baseName}__button--next`}
      on:click={() => swiper.go('>')}
    >
      <Icon name="fas fa-angle-right" size="3" />
    </button>
  {/if}
</div>

<style lang="scss" global>
  @import '../../node_modules/@glidejs/glide/dist/css/glide.core.min.css';

  :where(.Swiper__button) {
    padding: 0.5rem;
    border: 0 none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  :where(.Swiper__button--prev) {
    left: 1rem;
  }

  :where(.Swiper__button--next) {
    right: 1rem;
  }
</style>
