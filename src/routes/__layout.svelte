<script>
  import 'boilerplate/styles/style.scss';
  import 'src/styles/style.scss';
</script>

<header>
  <a href="/"><Logo /></a>
</header>

<Nav breakpoint="440px" />

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
