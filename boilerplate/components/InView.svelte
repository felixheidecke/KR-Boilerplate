<script>
  import { classNameHelper } from '@/js/utils';
  import { onMount } from 'svelte';

  export let transition = 'fade';

  let inView;
  let wrapper;
  let isInView = false;

  onMount(async () => {
    inView = await import('in-view');
    isInView = inView.is(wrapper);
  });

  const className = ['InView'];
  if (transition) className.push(`--${transition}`);
</script>

<svelte:window on:scroll|passive={() => (isInView = inView.is(wrapper))} />

<div bind:this={wrapper} class={classNameHelper(className, $$props)} class:--in-view={isInView}>
  <slot />
</div>

<style lang="scss" global>
  // -- Fade ----------------
  :where(.InView.--fade) {
    opacity: 0;
    transition: {
      delay: 100ms;
      property: opacity;
      duration: 333ms;
    }

    &.--in-view {
      opacity: 1;
    }
  }

  // -- Scale ----------------

  :where(.InView.--scale) {
    transform: scale(0.75);
    opacity: 0.75;
    transition: {
      delay: 100ms;
      property: transform, opacity;
      duration: 500ms;
    }

    &.--in-view {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
