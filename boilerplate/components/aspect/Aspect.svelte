<script>
  export let ratio = '16:9';
  const [x, y] = ratio.split(':');
</script>

<section class={$$props.class}>
  <div style={`padding-top: ${(+y / +x) * 100}%`} />
  <slot />
</section>

<style lang="scss">
  section {
    position: relative;
    width: 100%;
    overflow: hidden;

    :global() {
      > div:first-child {
        display: block;
        opacity: 0;
        width: 100%;
      }

      > *:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
