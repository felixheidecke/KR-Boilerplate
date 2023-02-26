<!--

  <Picture> Parameter:
  ********************

	"src"          [string]
	"alt"          [string]
	"loading"?     ['lazy' | 'eager']
	"align"?       ['left' | 'right']
	"tablet"?      [string]
	"desktop"?     [string]
	"widescreen"?  [string]

-->

<svelte:head>
	<title>Picture | Boilerplate</title>
</svelte:head>

<h1>Picture</h1>

<Picture
	src="https://picsum.photos/768/512"
	tablet="https://picsum.photos/1024/682"
	desktop="https://picsum.photos/1440/960"
	widescreen="https://picsum.photos/2560/1766"
/>
