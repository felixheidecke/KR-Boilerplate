<script>
  let html = `
<Aspect ratio="1:1">
  <h2>1:1</h2>
</Aspect>
  
<Aspect ratio="16:9">
  <h2>16:9</h2>
</Aspect>
`;
</script>

<svelte:head>
  <title>Aspect.svelte</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <Aspect ratio="1:1" class="cornflowerblue">
    <h2 class="$m-0">1:1</h2>
  </Aspect>
  <Aspect ratio="16:9" class="blueviolet">
    <h2 class="$m-0">16:9</h2>
  </Aspect>
</div>

<style lang="scss">
  [data-page] :global {
    .Aspect {
      max-width: 33vw;

      &__content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .cornflowerblue {
      background-color: cornflowerblue;
    }

    .blueviolet {
      background-color: blueviolet;
    }
  }
</style>
