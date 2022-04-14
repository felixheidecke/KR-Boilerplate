<script>
  // import log from '@/js/log';
  import { routes } from '@/stores/routes';
  import { browser } from '$app/env';
  import { onMount } from 'svelte';

  import Tree from './partials/NavTree.svelte';
  import Burger from './partials/NavBurger.svelte';

  import './styles/nav-bar.scss';
  import './styles/nav-slide.scss';

  const Type = {
    bar: 'bar',
    slide: 'slide'
  };

  export let variant = false;
  export let breakpoint = '1024px';

  let type = variant;

  onMount(() => {
    if (!breakpoint || !browser) return;

    const media = window.matchMedia(`(max-width: ${breakpoint})`);
    type = media.matches ? Type.slide : Type.bar;

    media.onchange = (media) => {
      hide();
      type = media.matches ? Type.slide : Type.bar;
      show();
    };
  });

  // Change visibility of the nav
  // to prevent initial transition effects.
  // Replay on media change

  let hidden = true;

  const hide = () => (hidden = true);

  const show = () => setTimeout(() => (hidden = false));

  // Toggle active / inactive

  let active = false;

  const toggle = () => (active = !active);

  // Init
  show();
</script>

<nav
  class:NavSlide={type === Type.slide}
  class:NavBar={type === Type.bar}
  class:--active={active}
  aria-label="main navigation"
  {hidden}
  on:click={() => (active = false)}
>
  <ul class="-ul">
    <Tree routes={$routes} on:click={() => (active = false)} />
  </ul>
</nav>
{#if type === Type.slide}
  <Burger {active} on:click={toggle} />
{/if}
