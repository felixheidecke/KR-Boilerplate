<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } });
</script>

<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // --- Props --------
  export let id;

  // --- Data --------
  let show = false;

  // --- Lifecycle ----
  onMount(() => {
    if (id) return (show = true);
    goto(document.location.href);
  });
</script>

{#if show}
  <Xioni article={id} />

  <hr />

  <Button href="/news" icon="fas fa-arrow-left">Zurück zur Übersicht</Button>
{/if}

<style lang="scss">
  hr {
    clear: both;
    margin: 3rem 0;
    border: 0 none;
    border-bottom: 1px solid map-get($color, wool-darker);
  }
</style>
