<script>
	const { gallery } = $$props.data
</script>

<h1>Gallerie</h1>

<Client browser>
	<XioniGallery {gallery} basePath="/xioni/gallerie/" />
</Client>
