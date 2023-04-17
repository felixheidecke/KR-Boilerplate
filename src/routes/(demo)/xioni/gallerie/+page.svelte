<script>
	import { get } from '$lib/boilerplate/libraries/xioni/gallery'

	const getGallery = get(1453)
</script>

<h1>Gallerie</h1>

{#await getGallery then gallery}
	<XioniGallery {gallery} basePath="/xioni/gallerie/" />
{/await}
