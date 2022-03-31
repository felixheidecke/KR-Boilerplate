<script>
  import Tree from '../partials/NavTree.svelte';
  import { routes } from 'boilerplate/stores/routes';
  import { breakpoints } from 'boilerplate/stores/breakpoints';

  export let on = false;

  $: show = () => {
    if (!on) return true;
    if ($breakpoints[on]) return true;
    return false;
  };
</script>

{#if show()}
  <nav class="kr-nav-bar" aria-label="main navigation">
    <ul>
      <Tree routes={$routes} />
    </ul>
  </nav>
{/if}

<style src="./NavBar.scss" lang="scss" global></style>
