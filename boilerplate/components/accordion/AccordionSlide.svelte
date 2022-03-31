<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';

  export let title;

  const id = Math.random();
  const activeItem = getContext('activeItem');

  $: collapsed = id !== $activeItem;

  // -- CSS Classes ---------------------------------------------
  export let blank = false;
  import CN from '@/js/className';

  const baseClass = !blank ? 'kr-accordion__slide' : 'accordion__slide';
  const cn = new CN($$props.class);

  cn.addClass = baseClass;
  // ------------------------------------------------------------
</script>

<li class={cn.render()} on:click={() => ($activeItem = id)}>
  <h5 class={baseClass + '-title'}>
    {title}
  </h5>
  <div transition:slide class={baseClass + '-content'}>
    {#if !collapsed}
      <slot />
    {/if}
  </div>
</li>
