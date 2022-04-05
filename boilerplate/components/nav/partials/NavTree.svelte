<script>
  import { page } from '$app/stores';
  export let routes = [];

  let hoverState = false;
</script>

{#each routes as route, i}
  <li class="-li" on:mouseenter={() => (hoverState = i)} on:mouseleave={() => (hoverState = false)}>
    <a
      class={['-a', route.class].toClass()}
      href={route.href}
      class:--active={$page.url.pathname === route.href}
      class:--hover={hoverState === i}
      on:click
    >
      {#if route.icon}
        <Icon name={route.icon} ex-class="-icon" class="-mr-xs" />
      {/if}
      {route.name}
    </a>

    {#if !!route.routes.length}
      <ul class="-ul-ul" class:--visible={hoverState === i}>
        <NavSubTree routes={route.routes} on:click />
      </ul>
    {/if}
  </li>
{/each}
