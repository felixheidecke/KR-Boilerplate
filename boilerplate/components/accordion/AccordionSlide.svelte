<script>
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';

  export let title;

  const id = Math.random();
  const activeItem = getContext('activeItem');

  $: collapsed = id !== $activeItem;
</script>

<li class="-slide" on:click={() => ($activeItem = id)}>
  <h5 class="-slide-title">
    {title}
  </h5>
  <div transition:slide class="-slide-content">
    {#if !collapsed}
      <slot />
    {/if}
  </div>
</li>
