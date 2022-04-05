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

<Wrapper>
  <PageTransition {url}>
    <slot />
  </PageTransition>
</Wrapper>

<Boilerplate />

<style lang="scss" global>
  body {
    background-color: #fbfbfb;
  }

  header {
    position: relative;
    text-align: center;
  }

  .Nav {
    margin-bottom: 2rem;
  }
</style>
