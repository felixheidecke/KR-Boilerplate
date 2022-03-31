<script>
  export let ratio = '16:9';
  export let blank = false;

  const [x, y] = ratio.split(':');

  const className = !blank ? ['kr-aspect'] : ['aspect'];
</script>

<div class={className.toClass($$props)}>
  <div style={`padding-top: ${(+y / +x) * 100}%`} />
  <slot />
</div>

<style lang="scss" global>
  .kr-aspect {
    position: relative;
    width: 100%;
    overflow: hidden;

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
</style>
