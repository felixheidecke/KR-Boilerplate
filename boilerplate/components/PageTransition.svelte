<script>
  import { blur } from 'svelte/transition'
  export let url
</script>

{#key url}
  <div class="PageTransition" in:blur={{ duration: 250 }}>
    <slot />
  </div>
{/key}
