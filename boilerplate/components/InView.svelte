<script>
  import classnames from 'classnames';
  import { onMount } from 'svelte';

  export let transition = 'fade';

  let inView;
  let wrapper;
  let isInView = false;

  onMount(async () => {
    inView = await import('in-view');
    isInView = inView.is(wrapper);
  });

  // --- CSS Classname ----------------

  const baseName = $$props['ex-class'] || 'InView';

  $: className = classnames(
    baseName,
    $$props.class,
    !isInView || baseName + '--visible',
    !transition || baseName + '--fade'
  );
</script>

<svelte:window on:scroll|passive={() => (isInView = inView.is(wrapper))} />

<div bind:this={wrapper} class={className}>
  <slot />
</div>

<style lang="scss" global>
  // -- Fade ----------------
  :where(.InView--fade) {
    opacity: 0;
    transition: {
      delay: 100ms;
      property: opacity;
      duration: 333ms;
    }
  }

  :where(.InView--fade.InView--visible) {
    opacity: 1;
  }

  // -- Scale ----------------

  :where(.InView--scale) {
    transform: scale(0.75);
    opacity: 0.75;
    transition: {
      delay: 100ms;
      property: transform, opacity;
      duration: 500ms;
    }
  }

  :where(.InView--scale.InView--visible) {
    transform: scale(1);
    opacity: 1;
  }
</style>
