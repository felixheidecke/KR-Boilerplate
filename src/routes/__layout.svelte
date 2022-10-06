<script>
  import 'style'
  import { BP_INFO } from '@/stores/bp-info'
</script>

<Nav variant="slide" />

<div data-root>
  <header>
    <h1 class="$m-0">Boilerplate</h1>
    <pre>Version {$BP_INFO.version}</pre>
  </header>
  <main>
    <slot />
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: {
      left: 2rem;
      right: 2rem;
    }
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
    .title:before {
      content: '<';
    }
    .title:after {
      content: ' />';
    }
  }
</style>
