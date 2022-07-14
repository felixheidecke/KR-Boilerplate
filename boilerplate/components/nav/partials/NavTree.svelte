<script>
  import classnames from 'classnames';
  import { page } from '$app/stores';

  import Link from '@/components/Link.svelte';
  import SubTree from './NavSubTree.svelte';

  // --- Data -------------------------

  export let routes = [];
  export let baseName;

  let hoverState = false;

  // --- CSS Class --------------------

  const className = (route, hover) => {
    return classnames(
      baseName + '__a',
      route.class,
      !hover || baseName + '--hover',
      $page.url.pathname !== route.href || baseName + '--active'
    );
  };
</script>

{#each routes as route, i}
  <li
    class="-li"
    on:mouseenter={() => (hoverState = i)}
    on:mouseleave={() => (hoverState = false)}
  >
    <Link
      ex-class={className(route, hoverState === i)}
      to={route.href}
      icon={route.icon}
      on:click
    >
      {route.name}
    </Link>

    {#if !!route.routes.length}
      <ul class="-ul-ul" class:--visible={hoverState === i}>
        <SubTree routes={route.routes} on:click />
      </ul>
    {/if}
  </li>
{/each}
