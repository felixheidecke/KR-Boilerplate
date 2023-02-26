<!--

  <XioniGallery> Parameter:
  *************************

  "gallery"         [Array(Object)]
  "detailPath"?     [String] = ''
  "linkDelimiter"?  [String] = '_'

-->
<script>
	export let data

	const { gallery } = data
</script>

<XioniGallery {gallery} detailPath="/gallerie/" />
