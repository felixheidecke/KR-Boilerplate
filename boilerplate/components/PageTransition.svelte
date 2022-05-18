<script>
  import { slide } from 'svelte/transition';

  export let url;
  // const pageTransitionDuration = 333;
</script>

{#key url}
  <div transition:slide>
    <slot />
  </div>
{/key}

<!-- in:fly={{ x: -5, duration: pageTransitionDuration, delay: pageTransitionDuration }}
out:fly={{ x: 5, duration: pageTransitionDuration }} -->
