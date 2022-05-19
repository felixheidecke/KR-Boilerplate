<script>
  import { slide, fade } from 'svelte/transition';

  export let url;
  // const pageTransitionDuration = 333;
</script>

{#key url}
  <div in:fade={{ duration: 250, delay: 350 }} out:slide={{ duration: 500 }}>
    <slot />
  </div>
{/key}
