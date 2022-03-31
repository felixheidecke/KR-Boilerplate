<script>
  import Tree from '../partials/NavTree.svelte';
  import Burger from '../partials/NavBurger.svelte';
  import { routes } from 'boilerplate/stores/routes';
  import { breakpoints } from 'boilerplate/stores/breakpoints';

  export let on = false;
  let active = false;

  $: show = () => {
    if (!on) return true;
    if ($breakpoints[on]) return true;
    return false;
  };

  const toggle = () => (active = !active);
</script>

{#if show()}
  <nav class="kr-nav-slide" class:--active={active} aria-label="main navigation" on:click={toggle}>
    <ul>
      <Tree routes={$routes} on:click={toggle} />
    </ul>
  </nav>
  <Burger {active} on:click={toggle} />
{/if}

<style src="./NavSlide.scss" lang="scss" global></style>
