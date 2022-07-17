<script>
  let html = `
<Grid>
  <Grid size="tablet-1-2 desktop-1-3">Frank</Grid>
  <Grid size="tablet-1-2 desktop-2-3">Felix</Grid>
  <Grid size="tablet-1-3">Klaus</Grid>
  <Grid size="tablet-1-3">Susi</Grid>
  <Grid size="tablet-1-3">Uwe</Grid>
</Grid>
`;
</script>

<svelte:head>
  <title>Grid | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <Grid>
    <Grid size="tablet-1-2 desktop-1-3" class="c1">Frank</Grid>
    <Grid size="tablet-1-2 desktop-2-3" class="c2">Felix</Grid>
    <Grid size="tablet-1-3" class="c3">Klaus</Grid>
    <Grid size="tablet-1-3" class="c4">Susi</Grid>
    <Grid size="tablet-1-3" class="c5">Uwe</Grid>
  </Grid>
</div>

<style lang="scss">
  [data-page] :global {
    .Grid__item {
      color: white;
      font-size: 1.25rem;
      font-weight: bold;
      padding: 1rem;
      text-align: center;
    }

    .c1 {
      background-color: cornflowerblue;
    }

    .c2 {
      background-color: blueviolet;
    }

    .c3 {
      background-color: chocolate;
    }

    .c4 {
      background-color: darkmagenta;
    }

    .c5 {
      background-color: crimson;
    }
  }
</style>
