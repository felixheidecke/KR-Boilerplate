<script context="module">
  export const load = async ({ url }) => ({ props: { url } });
</script>

<script>
  export let url;
</script>

<header>
  <a href="/"><Logo /></a>
</header>

<Nav />

<main>
  <PageTransition {url}>
    <slot />
  </PageTransition>
</main>

<Boilerplate />

<style lang="scss" global>
  body {
    background-color: #fbfbfb;
  }

  header {
    position: relative;
    text-align: center;
  }

  main {
    max-width: 60rem;
    margin: 2rem auto;
  }

  .Nav {
    margin-bottom: 2rem;
  }
</style>
