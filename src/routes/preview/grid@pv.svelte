<script>
  let html = `
<Grid>
  <Grid size="1-2">1-2</Grid>
  <Grid size="1-2">1-2</Grid>
  <Grid size="1-3">1-3</Grid>
  <Grid size="1-3">1-3</Grid>
  <Grid size="1-3">1-3</Grid>
</Grid>
`;
</script>

<svelte:head>
  <title>Button.svelte</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <Grid>
    <Grid size="1-2" class="c1">50%</Grid>
    <Grid size="1-2" class="c2">50%</Grid>
    <Grid size="1-3" class="c3">33%</Grid>
    <Grid size="1-3" class="c4">33%</Grid>
    <Grid size="1-3" class="c5">33%</Grid>
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
