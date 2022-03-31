<script>
  import { onMount } from 'svelte';

  let inView;
  let wrapper;
  let isInView = false;

  onMount(async () => {
    inView = await import('in-view');
    isInView = inView.is(wrapper);
  });

  // --- CSS classes --------
  import CN from '@/js/className';
  const cn = new CN(['kr-in-view', $$props.class]);
</script>

<svelte:window on:scroll|passive={() => (isInView = inView.is(wrapper))} />

<div bind:this={wrapper} class={cn.render()} class:--in-view={isInView}>
  <slot />
</div>
