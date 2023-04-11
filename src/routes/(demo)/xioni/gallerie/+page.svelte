<script>
	import { get as getGallery } from '$lib/boilerplate/libraries/xioni/gallery'
</script>

<h1>Gallerie</h1>

{#await getGallery(1453) then gallery}
	<XioniGallery {gallery} basePath="/xioni/gallerie/" />
{/await}
