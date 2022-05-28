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
    <Nav variant="slide" />
  </header>
  <main>
    <Wrapper>
      <PageTransition {url}>
        <slot />
      </PageTransition>
    </Wrapper>
  </main>
  <footer>
    <small>&copy; Klickrhein {year}</small>
  </footer>
</div>

<style>
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
    background: #141d37;
  }

  main {
    flex-grow: 1;
  }
</style>
