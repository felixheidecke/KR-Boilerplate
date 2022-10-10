<script context="module">
  // Das Styling für die gesamte Seite
  import 'style'
  export const load = async ({ url }) => ({ props: { url } })
</script>

<script>
  import { BP_INFO } from '@/stores/bp-info'
  export let url
</script>

<div data-root class="$p $p-2@desktop-up">
  <header>
    <h1 class="$m-0">Boilerplate</h1>
    <pre>Version {$BP_INFO.version}</pre>
  </header>

  <Nav data-variant="slide" sticky />

  <main class="$mt-2@desktop-up">
    <PageTransition {url}>
      <slot />
    </PageTransition>
  </main>
  <footer>
    <small>Klickrhein Boilerpalte &nbsp;&loz;&nbsp; Build {$BP_INFO.build}</small>
  </footer>
</div>

<Toplink />

<style lang="scss">
  [data-root] {
    margin: 0 auto;
    max-width: 1280px;
    min-height: 200vh;
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

  [data-root] :global {
    .NavBar__ul-ul {
      box-shadow: 2px 2px 6px rgba(black, 0.25);
      background-color: white;
      border-radius: 0.5rem;
      z-index: 9;
    }

    .NavBar__a {
      transition: padding 250ms ease-in-out;
    }

    .NavBar__a--active {
      border-bottom: 2px solid;
    }

    .NavBar__a--hover {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .title:before {
      content: '<';
    }
    .title:after {
      content: ' />';
    }
  }
</style>
