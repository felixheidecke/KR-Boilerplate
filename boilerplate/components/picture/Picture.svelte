<script>
  export let src;
  export let alt = '';
  export let loading = 'lazy';

  export let tablet = false;
  export let desktop = false;
  export let widescreen = false;

  // --- Style ---
  export let blank = false;
  const className = !blank ? ['kr-picture'] : ['picture'];
</script>

<picture class={className.toClass($$props)}>
  {#if widescreen}
    <source srcset={widescreen} media="(min-width: 1441px)" />
  {/if}
  {#if desktop}
    <source srcset={desktop} media="(min-width: 1025px)" />
  {/if}
  {#if tablet}
    <source srcset={tablet} media="(min-width: 768px)" />
  {/if}
  <img srcset={src} {alt} {loading} />
</picture>

<style lang="scss" global>
  .kr-picture {
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>
