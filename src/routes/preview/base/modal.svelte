<script>
  let modal = {}
  let code = `
<Button on:click={modal.open()}>Modal öffnen</Button>

<Modal title="Meine Überschrift" bind:this={modal}>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quae impedit ratione
    perferendis suscipit, architecto neque expedita veritatis velit facilis maxime distinctio et
    quidem. Fugit quos voluptas voluptate maiores perspiciatis.
  </p>
</Modal>`
</script>

<svelte:head>
  <title>Modal | Boilerplate</title>
</svelte:head>

<div data-page>
  <h2>Modal</h2>
  <h3>Code</h3>

  <Code code="let modal;" script />

  <Code {code} />

  <Button on:click={modal.open()}>Modal öffnen</Button>

  <Modal title="Meine Überschrift" bind:this={modal}>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quae impedit ratione
      perferendis suscipit, architecto neque expedita veritatis velit facilis maxime distinctio et
      quidem. Fugit quos voluptas voluptate maiores perspiciatis.
    </p>
  </Modal>
</div>
