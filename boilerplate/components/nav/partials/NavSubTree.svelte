<script>
  import { page } from '$app/stores';
  export let routes = [];

  let hoverState = false;
</script>

{#each routes as route, i}
  <li class="-li-li" on:mouseenter={() => (hoverState = i)} on:mouseleave={() => (hoverState = false)}>
    <a
      class="-a-a"
      href={route.href}
      class:--active={$page.url.pathname === route.href}
      class:--hover={hoverState === i}
      on:click
    >
      {#if route.icon}
        <Icon name={route.icon} ex-class="-icon-icon" class="-mr-xs" />
      {/if}
      {route.name}
    </a>
  </li>
{/each}
