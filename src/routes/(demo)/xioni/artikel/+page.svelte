<script>
	import { getMany as getArticles } from '$lib/boilerplate/libraries/xioni/article'
</script>

<h1>Artikel</h1>

{#await getArticles(1383) then articles}
	<ol class="$flex $flex-column $gap">
		{#each articles as article}
			<XioniArticleTile tag="li" {article} basePath="/xioni/artikel/" />
		{/each}
	</ol>
{/await}
