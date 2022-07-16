<script>
  import classNames from 'classnames';
  import { page } from '$app/stores';

  import Link from '@/components/Link.svelte';

  export let routes = [];
  export let baseName;

  let hoverState = false;

  $: className = (route, hover) => {
    return classNames(
      baseName + '__a-a',
      route.class,
      !hover || baseName + '--hover',
      $page.url.pathname !== route.href || baseName + '--active'
    );
  };
</script>

{#each routes as route, i}
  <li
    class={baseName + '__li-li'}
    on:mouseenter={() => (hoverState = i)}
    on:mouseleave={() => (hoverState = false)}
  >
    <a class={className(route, hoverState === i)} href={route.href} on:click>
      {route.name}
    </a>
  </li>
{/each}
