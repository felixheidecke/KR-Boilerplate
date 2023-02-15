<script>
	export let data
	const { title, photos } = data.album
</script>

<h1>
	{title}
</h1>

<XioniAlbum {photos} />
