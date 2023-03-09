<script>
	import './+page.css'

	const { article } = $$props.data
</script>

<XioniArticle {article} />

<hr />

<div class="$text-center">
	<Link icon="fas fa-reply" to="./">Zurück zur Übersicht</Link>
</div>
