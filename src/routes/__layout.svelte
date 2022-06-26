<script context="module">
  // Das Styling für die gesamte Seite
  import 'style';
  export const load = async ({ url }) => ({ props: { url } });
</script>

<script>
  export let url;

  let year = new Date().getFullYear();
</script>

<div>
  <header>
    <Nav />
  </header>
  <main>
    <PageTransition {url}>
      <slot />
    </PageTransition>
  </main>
  <footer>
    <small>&copy; Klickrhein {year}</small>
  </footer>
</div>

<style lang="scss">
  div {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header,
  footer {
    flex-shrink: 0;
    padding: 1rem;
    text-align: center;
    background-color: $c-light;
  }

  main {
    flex-grow: 1;
  }
</style>
