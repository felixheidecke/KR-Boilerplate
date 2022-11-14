<script>
  import { ALBUMS, fetchGallery } from '@/stores/gallery'
  import { onMount } from 'svelte'

  export let id
  $: detailPath = $$props['detail-path'] || ''

  $: albums = $ALBUMS.filter(({ module }) => module === +id) || []

  onMount(() => fetchGallery(id))
</script>

<div class="XioniGallery">
  <ul>
    {#each albums as { id, title, slug }}
      <li>
        <Link to={`${detailPath}${id}-${slug}`}>{title}</Link>
      </li>
    {/each}
  </ul>
</div>
