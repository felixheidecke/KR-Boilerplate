<script>
  const nav = [
    'accordion',
    'aspect',
    'button',
    'form',
    'grid',
    'icon',
    'link',
    'mail',
    'modal',
    'opening-hours',
    'picture',
    'swiper',
    'youtube',
    'xioni-article-list'
  ]
</script>

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

<ul>
  {#each nav as to}
    <li>
      <Link class="layout-nav-item $block $p" {to} />
    </li>
  {/each}
</ul>

<section class="$p $p-2@tablet-up">
  <slot />
</section>

<style lang="scss">
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      text-transform: uppercase;
    }
  }

  :global .layout-nav-item {
    text-decoration: none;
    font-weight: bold;
    display: block;
  }
</style>
