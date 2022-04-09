<script>
  import log from '@/js/log';
  import { routes } from '@/stores/routes';
  import { breakpoints } from '@/stores/breakpoints';

  import Tree from './partials/NavTree.svelte';
  import Burger from './partials/NavBurger.svelte';

  import './styles/nav-bar.scss';
  import './styles/nav-slide.scss';

  let active = false;

  // --- Handle Bar --------
  export let bar = false;

  $: isBar = () => {
    if (bar === true) return true;
    if (!!$breakpoints[bar]) return true;
    return false;
  };

  // --- Handle Slide --------
  export let slide = false;

  $: isSlide = () => {
    if (slide === true) return true;
    if (!!$breakpoints[slide]) return true;
    return false;
  };

  if (!slide && !bar) {
    log.error('Nav', 'either "slide" or "bar" needs to be set!');
  }

  const toggle = () => (active = !active);
</script>

<nav
  class:NavSlide={isSlide()}
  class:NavBar={isBar()}
  class:--active={active}
  aria-label="main navigation"
  on:click={() => (active = false)}
>
  <ul class="-ul">
    <Tree routes={$routes} on:click={() => (active = false)} />
  </ul>
</nav>
{#if slide}
  <Burger {active} on:click={toggle} />
{/if}
