<script>
  import classNames from 'classnames';
  import { page } from '$app/stores';

  import Link from '@/components/Link.svelte';

  export let routes = [];

  let hoverState = false;

  const className = (route, hover) => {
    return classNames(
      '-a-a',
      route.class,
      !hover || '--hover',
      $page.url.pathname !== route.href || '--active'
    );
  };
</script>

{#each routes as route, i}
  <li
    class="-li-li"
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
  </li>
{/each}
