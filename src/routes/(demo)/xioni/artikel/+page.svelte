<script>
	import { getMany } from '$lib/boilerplate/libraries/xioni/article'

	const getArticles = getMany(1383)
</script>

<h1>Artikel</h1>

{#await getArticles then articles}
	<ol class="$flex $flex-column $gap">
		{#each articles as article}
			<XioniArticleTile tag="li" {article} basePath="/xioni/artikel/" />
		{/each}
	</ol>
{/await}
