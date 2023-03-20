<script>
	const { album } = $$props.data
</script>

<h1>
	{album.title}
</h1>

<XioniAlbum photos={album.photos} />

<hr />

<div class="$text-center">
	<Link icon="fas fa-reply" to="./">Zurück zur Übersicht</Link>
</div>
