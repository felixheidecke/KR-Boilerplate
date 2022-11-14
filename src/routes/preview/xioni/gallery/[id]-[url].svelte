<script context="module">
  export const load = async ({ params }) => ({ props: { id: +params.id } })
</script>

<script>
  import { ALBUMS, STATE, fetchAlbum } from '@/stores/gallery'
  import { onMount } from 'svelte'

  // --- Props --------
  export let id

  // --- Computed -----
  $: album = $ALBUMS.find((album) => album.id === id) || {}

  // --- Lifecycle ----
  onMount(() => fetchAlbum(id))
</script>

<svelte:head>
  <title>{album.title}</title>
  <link rel="preconnect" href="https://cdn.rheingau.de" />
</svelte:head>

<div data-root>
  <h2>{album.title}</h2>

  {#if album.id && !$STATE.loading}
    <XioniAlbum images={album.images} />
  {/if}

  <Button class="$mt" icon="fas fa-chevron-left" to="./">Zurück zur Übersicht</Button>
</div>
