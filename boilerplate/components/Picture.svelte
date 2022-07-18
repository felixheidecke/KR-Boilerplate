<script>
  import classnames from 'classnames';

  // --- Data -------------------------

  export let src;
  export let alt = '';
  export let loading = 'lazy';
  export let align = 'left';

  export let tablet = false;
  export let desktop = false;
  export let widescreen = false;

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Picture';

  $: className = classnames(baseName, $$props.class);
</script>

<picture class={className}>
  {#if widescreen}
    <source srcset={widescreen} media="(min-width: 1441px)" />
  {/if}
  {#if desktop}
    <source srcset={desktop} media="(min-width: 1025px)" />
  {/if}
  {#if tablet}
    <source srcset={tablet} media="(min-width: 768px)" />
  {/if}
  <img class={baseName + '__img'} srcset={src} {alt} {loading} {align} />
</picture>

<style lang="scss" global>
  :where(.Picture) {
    display: inline-block;
  }
  :where(.Picture__img) {
    width: 100%;
    height: auto;
    max-width: fit-content;
  }
</style>
