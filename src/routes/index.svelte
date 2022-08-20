<svelte:head>
  <title>Website Titel</title>
</svelte:head>

<h1>Welcome</h1>

<p>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt dolor iste
  tempore repellat molestiae ut quis eius, iusto exercitationem consequatur odio
  magnam, minus fuga ipsa cumque esse ab, nihil quae!
</p>

<Lightbox>
  <Grid>
    <Grid size="1-2">
      <img
        src="https://picsum.photos/id/1/400/300"
        data-lightbox="https://picsum.photos/id/1/1000/750"
        alt="Typ am Laptop"
      />
    </Grid>
    <Grid size="1-2">
      <img
        src="https://picsum.photos/id/372/400/300"
        data-lightbox="https://picsum.photos/id/372/1000/750"
        alt="Baywatch Booth"
      />
    </Grid>
    <Grid size="1-2">
      <img
        src="https://picsum.photos/id/1041/400/300"
        data-lightbox="https://picsum.photos/id/1041/1000/750"
        alt="Waves"
      />
    </Grid>
    <Grid size="1-2">
      <img
        src="https://picsum.photos/id/827/400/300"
        data-lightbox="https://picsum.photos/id/827/1000/750"
        alt="Fujiama in the distace"
      />
    </Grid>
  </Grid>
</Lightbox>

<Toplink />
