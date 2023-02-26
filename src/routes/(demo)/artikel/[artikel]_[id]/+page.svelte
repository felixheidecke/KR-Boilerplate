<!--

  <XioniArticle> Parameter:
  *************************

	"article"        [Object]
	"basePath"?      [String] = ''

-->
<script>
	export let data

	const { article } = data
</script>

<XioniArticle {article} basePath="/article-list/" />
