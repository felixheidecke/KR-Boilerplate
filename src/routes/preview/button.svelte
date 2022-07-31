<script>
  let html = `
<Button>Button</Button>
<Button disabled>Disabled</Button>
<Button icon="fab fa-apple">Apple</Button>
<Button icon="fab fa-facebook" reverse>Facebook</Button>
`
</script>

<svelte:head>
  <title>Button | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <Button>Button</Button>
  <Button disabled>Disabled</Button>
  <Button icon="fab fa-apple">Apple</Button>
  <Button icon="fab fa-facebook" reverse>Facebook</Button>
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
