<script>
  import classNames from 'classnames'

  export let routes = []
  export let baseName = 'Nav'

  let hoverState = false

  $: className = (route, hover) => {
    return classNames(
      baseName + '__a-a',
      route.class,
      !hover || baseName + '__a-a--hover',
      !route.isActive || baseName + '__a-a--active'
    )
  }
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
