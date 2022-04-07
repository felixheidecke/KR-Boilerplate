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
  <nav class="NavSlide" class:--active={active} aria-label="main navigation" on:click={() => (active = false)}>
    <ul class="-ul">
      <Tree routes={$routes} on:click={() => (active = false)} />
    </ul>
  </nav>
  <Burger {active} on:click={toggle} />
{/if}

<style lang="scss" global>
  .NavSlide {
    @if mixin-exists(NavSlide-reset) {
      @include NavSlide-reset;
    } @else {
      position: fixed;
      top: 0;
      right: 0;
      width: 100vw;
      min-height: 100vh;
      z-index: 1;
      transition: background-color 0.5s;

      &:not(.--active) {
        background-color: transparent;
        user-select: none;
        pointer-events: none;
      }

      &.--active {
        background-color: rgba(black, 0.666);
      }

      // --- First Level ----------------------------------------

      .-ul {
        align-items: center;
        display: inline-flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        max-width: 30rem;
        min-height: 100vh;
        margin: 0;
        padding: 2rem;
        position: absolute;
        right: 0;
        transform: translateX(100%);
        transition: transform 0.5s;
        width: 100%;
        background-color: lightblue;
      }

      &.--active .-ul {
        transform: translateX(0);
      }

      .-li {
        display: inline-flex;
        justify-content: center;
        width: fit-content;
        flex-direction: column;
        max-width: 19rem;
      }

      .-a {
        font-size: 1.25rem;
        font-weight: bold;
        padding: 0.5rem 1rem;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
      }

      // --- Second Level ---------------------------------------

      .-ul-ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        @include reset;
      }

      .-li-li {
        display: flex;
        justify-content: center;
      }

      .-a-a {
        font-size: 1rem;
        padding: 0.5rem;
        text-decoration: none;
      }
    }

    @if mixin-exists(NavSlide) {
      @include NavSlide;
    }
  }
</style>
