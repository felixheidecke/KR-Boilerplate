<Boilerplate />

<header>
  <a href="/"><Logo /></a>
</header>

<Nav />

<main>
  <slot />
</main>

<style lang="scss">
  header {
    position: relative;
    text-align: center;
  }

  main {
    max-width: 60rem;
    margin: 2rem auto;
    padding: 0 2rem;
  }

  :global(.Nav) {
    margin-bottom: 2rem;
  }
</style>
