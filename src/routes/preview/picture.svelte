<script>
  import Picture from '@/components/Picture.svelte'

  let html = `
<Button on:click={modal.open()}>Modal öffnen</Button>

<Modal title="Ein tolles Foto" bind:this={modal}>
  <p>
    Schau mal hier, ein tolles Foto dass ich nicht selbst gemacht habe. Macht
    nix, sieht trotzdem gut aus.
  </p>
  <img src="https://picsum.photos/800/600" alt="Foto" />
</Modal>`
</script>

<svelte:head>
  <title>Picture | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <Picture
    src="https://picsum.photos/768/512"
    tablet="https://picsum.photos/1024/682"
    desktop="https://picsum.photos/1440/960"
    widescreen="https://picsum.photos/2560/1766"
  />
</div>
