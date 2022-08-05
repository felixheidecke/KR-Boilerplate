<script>
  import classnames from 'classnames'

  // --- Data -------------------------

  export let src
  export let alt = ''
  export let loading = 'lazy'
  export let align = false

  export let tablet = false
  export let desktop = false
  export let widescreen = false

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Picture'

  $: className = classnames(
    baseName,
    $$props.class,
    !align || [baseName, '--', align].join('')
  )
</script>

<picture>
  {#if widescreen}
    <source srcset={widescreen} media="(min-width: 1441px)" />
  {/if}
  {#if desktop}
    <source srcset={desktop} media="(min-width: 1025px)" />
  {/if}
  {#if tablet}
    <source srcset={tablet} media="(min-width: 768px)" />
  {/if}
  <img class={className} srcset={src} {alt} {loading} />
</picture>

<style lang="scss" global>
  :where(.Picture) {
    display: inline-block;
  }

  :where(.Picture--right) {
    float: right;
  }

  :where(.Picture--left) {
    float: left;
  }
</style>
