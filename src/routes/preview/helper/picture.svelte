<script>
  import Picture from '@/components/Picture.svelte'

  let code = `
<Picture
  src="https://picsum.photos/768/512"
  tablet="https://picsum.photos/1024/682"
  desktop="https://picsum.photos/1440/960"
  widescreen="https://picsum.photos/2560/1766"
/>`
</script>

<svelte:head>
  <title>Picture | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <Code {code} />

  <Picture
    src="https://picsum.photos/768/512"
    tablet="https://picsum.photos/1024/682"
    desktop="https://picsum.photos/1440/960"
    widescreen="https://picsum.photos/2560/1766"
  />
</div>
