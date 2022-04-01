<script>
  import { onMount } from 'svelte';

  let inView;
  let wrapper;
  let isInView = false;

  onMount(async () => {
    inView = await import('in-view');
    isInView = inView.is(wrapper);
  });
</script>

<svelte:window on:scroll|passive={() => (isInView = inView.is(wrapper))} />

<div bind:this={wrapper} class={['in-view'].toClass($$props)} class:--in-view={isInView}>
  <slot />
</div>
