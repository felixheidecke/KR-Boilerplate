<script>
  let code = `
<Lightbox>
  <img
    src="https://picsum.photos/id/1/400/300"
    data-lightbox="https://picsum.photos/id/1/1000/750"
    alt="Typ am Laptop"
  />
  <img
    src="https://picsum.photos/id/372/400/300"
    data-lightbox="https://picsum.photos/id/372/1000/750"
    alt="Baywatch Booth"
  />
  <img
    src="https://picsum.photos/id/1041/400/300"
    data-lightbox="https://picsum.photos/id/1041/1000/750"
    alt="Waves"
  />
  <img
    src="https://picsum.photos/id/827/400/300"
    data-lightbox="https://picsum.photos/id/827/1000/750"
    alt="Fujiama in the distace"
  />
</Lightbox>
`
</script>

<svelte:head>
  <title>Lightbox | Boilerplate</title>
</svelte:head>

<div data-page>
  <h2>Lightbox</h2>
  <h3>Code</h3>
  <Code {code} />

  <h3>Ergebnis</h3>
  <Lightbox>
    <img
      src="https://picsum.photos/id/1/400/300"
      data-lightbox="https://picsum.photos/id/1/1000/750"
      alt="Typ am Laptop"
    />
    <img
      src="https://picsum.photos/id/372/400/300"
      data-lightbox="https://picsum.photos/id/372/1000/750"
      alt="Baywatch Booth"
    />
    <img
      src="https://picsum.photos/id/1041/400/300"
      data-lightbox="https://picsum.photos/id/1041/1000/750"
      alt="Waves"
    />
    <img
      src="https://picsum.photos/id/827/400/300"
      data-lightbox="https://picsum.photos/id/827/1000/750"
      alt="Fujiama in the distace"
    />
  </Lightbox>
</div>
