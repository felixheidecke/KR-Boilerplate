<Nav variant="slide" />

<slot />

<footer>
  <Button href="/articles" class="button-back" icon="fas fa-arrow-left">Zurück zur Übersicht</Button>
</footer>

<style lang="scss">
  footer {
    text-align: center;
    padding: 4rem 0;

    :global(.button-back) {
      padding: 1rem 2rem;
      border: 1px solid lightgray;
    }
  }
</style>
