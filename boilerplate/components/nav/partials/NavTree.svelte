<script>
  import { page } from '$app/stores';
  export let routes = [];

  let hoverState = false;
</script>

{#each routes as route, i}
  <li on:mouseenter={() => (hoverState = i)} on:mouseleave={() => (hoverState = false)}>
    <a href={route.href} class:--active={$page.url.pathname === route.href} class:--hover={hoverState === i} on:click>
      {#if route.icon}
        <Icon name={route.icon} class="-mr-xs" />
      {/if}
      {route.name}
    </a>

    {#if !!route.routes.length}
      <ul class:--visible={hoverState === i}>
        <svelte:self routes={route.routes} on:click />
      </ul>
    {/if}
  </li>
{/each}
