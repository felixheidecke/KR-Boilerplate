<script>
  import { page } from '$app/stores';
  export let routes = [];
</script>

<ul>
  {#each routes as route}
    <li>
      <a href={route.href} class:--is-active={$page.url.pathname === route.href} on:click>
        {#if route.icon}
          <Icon name={route.icon} class="-mr-xs" />
        {/if}
        {route.name}
      </a>
      {#if route.routes.length}
        <svelte:self routes={route.routes} on:click />
      {/if}
    </li>
  {/each}
</ul>
