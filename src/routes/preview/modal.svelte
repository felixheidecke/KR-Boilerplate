<script>
  let modal = {}
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
  <title>Modal | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>

  <pre class="CodeHighlighter">&lt;script&gt;
  let modal;
&lt;/script&gt;</pre>

  <CodeHighlighter {html} />

  <Button on:click={modal.open()}>Modal öffnen</Button>

  <Modal title="Ein tolles Foto" bind:this={modal}>
    <p>
      Schau mal hier, ein tolles Foto dass ich nicht selbst gemacht habe. Macht
      nix, sieht trotzdem gut aus.
    </p>
    <img src="https://picsum.photos/800/600" alt="Foto" />
  </Modal>
</div>
