<script>
  import 'style';
</script>

<header>
  <h1>
    <a href="/">Boilerplate 3</a>
  </h1>
</header>

<!-- <Nav breakpoint="440px" /> -->

<main>
  <slot />
</main>

<style lang="scss">
  header {
    position: relative;
    text-align: center;
    padding: 1rem;
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
