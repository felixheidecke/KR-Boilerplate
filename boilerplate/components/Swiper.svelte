<script>
  import { classNameHelper } from '@/js/utils';
  import { onMount } from 'svelte';
  import { uniqueId } from 'lodash-es';
  import Glide from '@glidejs/glide';

  // Components
  import Icon from './Icon.svelte';

  let slider;

  // Props
  export let autoplay = 0;
  export let focusAt = 'center';
  export let gap = 0;
  export let hoverpause = 'true';
  export let perView = 1;
  export let speed = 1000; // animationDuration
  export let startAt = 0;
  export let type = 'carousel';

  export let nav = 'true';
  export let config = null; // Optional full config model

  const id = uniqueId('swiper-');

  const glideConfig = config || {
    autoplay: +autoplay,
    focusAt,
    gap: +gap,
    hoverpause: hoverpause === 'true',
    perView: +perView,
    animationDuration: +speed,
    startAt: +startAt,
    type
  };

  const swiper = new Glide('#' + id, glideConfig);

  onMount(() => {
    slider.querySelectorAll('.glide__slides > *').forEach((slide) => slide.classList.add('glide__slide'));
    swiper.mount();
  });
</script>

<div {id} class={classNameHelper(['Swiper', 'glide'], $$props)} bind:this={slider}>
  <div class="glide__track" data-glide-el="track">
    <div class="glide__slides">
      <slot />
    </div>
  </div>
  {#if nav === 'true'}
    <button class="-button --prev" on:click={() => swiper.go('<')}>
      <Icon name="fas fa-angle-left" size="3" />
    </button>
    <button class="-button --next" on:click={() => swiper.go('>')}>
      <Icon name="fas fa-angle-right" size="3" />
    </button>
  {/if}
</div>

<style lang="scss" global>
  @import '../../node_modules/@glidejs/glide/dist/css/glide.core.min.css';

  :where(.Swiper) .-button {
    padding: 0.5rem;
    border: 0 none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &.--prev {
      left: 1rem;
    }

    &.--next {
      right: 1rem;
    }
  }
</style>
