<script>
  import { classNameHelper } from '@/js/utils';
  import { page } from '$app/stores';

  import Link from '@/components/Link.svelte';
  import SubTree from './NavSubTree.svelte';

  export let routes = [];

  let hoverState = false;

  const setClassName = (route, hover) => {
    const className = ['-a', route.class];

    if ($page.url.pathname === route.href) {
      className.push('--active');
    }

    if (hover) {
      className.push('--hover');
    }

    return classNameHelper(className);
  };
</script>

{#each routes as route, i}
  <li class="-li" on:mouseenter={() => (hoverState = i)} on:mouseleave={() => (hoverState = false)}>
    <Link ex-class={setClassName(route, hoverState === i)} to={route.href} icon={route.icon} on:click>
      {route.name}
    </Link>

    {#if !!route.routes.length}
      <ul class="-ul-ul" class:--visible={hoverState === i}>
        <SubTree routes={route.routes} on:click />
      </ul>
    {/if}
  </li>
{/each}
