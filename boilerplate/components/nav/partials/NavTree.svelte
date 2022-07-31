<script>
  import classnames from 'classnames'
  import { page } from '$app/stores'

  import SubTree from './NavSubTree.svelte'

  // --- Data -------------------------

  export let routes = []
  export let baseName = 'Nav'

  let hoverState = false

  // --- CSS Class --------------------

  $: linkClassName = (route, hover) => {
    return classnames(
      baseName + '__a',
      route.class,
      !hover || baseName + '__a--hover',
      $page.url.pathname !== route.href || baseName + '__a--active'
    )
  }

  $: ulClassName = (hover) => {
    return classnames(
      baseName + '__ul-ul',
      !hover || baseName + '__ul-ul--visible'
    )
  }
</script>

{#each routes as route, i}
  <li
    class={baseName + '__li'}
    on:mouseenter={() => (hoverState = i)}
    on:mouseleave={() => (hoverState = false)}
  >
    <a
      class={linkClassName(route, hoverState === i)}
      href={route.href}
      on:click
    >
      {route.name}
    </a>

    {#if !!route.routes.length}
      <ul class={ulClassName(hoverState === i)}>
        <SubTree {baseName} routes={route.routes} on:click />
      </ul>
    {/if}
  </li>
{/each}
