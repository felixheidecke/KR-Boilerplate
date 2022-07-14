<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/agate.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
</svelte:head>

<div data-layout>
  <ul>
    {#each ['aspect', 'button', 'grid', 'icon', 'in-view'] as to}
      <li><Link class="$block $p" {to} /></li>
    {/each}
  </ul>

  <section class="$p-2">
    <slot />
  </section>
</div>

<style lang="scss">
  ul {
    display: flex;
    justify-content: space-around;

    li {
      text-transform: uppercase;
    }
  }
</style>
