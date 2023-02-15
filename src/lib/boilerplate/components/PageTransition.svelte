<script>
  import { blur } from 'svelte/transition'
  export let url
  export let tag = 'div'
</script>

{#key url}
  <svelte:element this={tag} class="PageTransition" in:blur={{ duration: 250 }}>
    <slot />
  </svelte:element>
{/key}
