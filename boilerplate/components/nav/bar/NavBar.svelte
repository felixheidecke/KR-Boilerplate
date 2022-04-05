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
  <nav class="Nav --bar" aria-label="main navigation">
    <ul class="-ul">
      <Tree routes={$routes} />
    </ul>
  </nav>
{/if}

<style lang="scss" global>
  [class*='Nav'].--bar {
    width: 100%;
    display: flex;
    justify-content: center;

    // --- First Level ----------------------------------------

    .-ul {
      @include reset-list;
      position: relative;
      display: flex;
      justify-content: center;
      height: 2.5rem;
    }

    .-li {
      position: relative;
      display: inherit;
    }

    .-a {
      font-weight: bold;
      padding: 0.5rem 1rem;
      white-space: nowrap;
    }

    // --- Second Level ---------------------------------------

    .-ul-ul {
      @include reset-list;
      left: 50%;
      position: absolute;
      top: 2.5rem;
      transform: translateX(-50%);
      z-index: 1;
    }

    .-li:not(:hover) .-ul-ul {
      display: none;
    }

    .-li-li {
      display: flex;
    }

    .-a-a {
      font-size: 0.85rem;
      padding: 0.5rem 2rem;
      white-space: nowrap;
      width: 100%;
    }
  }
</style>
