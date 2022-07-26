<script>
  import classnames from 'classnames';
  export let ratio = '16:9';

  const [x, y] = ratio.split(':');

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Aspect';

  $: className = classnames(baseName, $$props.class);
</script>

<div class={className}>
  <div
    class={baseName + '__ratio'}
    style={`padding-top: ${(+y / +x) * 100}%`}
  />
  <div class={baseName + '__content'}>
    <slot />
  </div>
</div>

<style global>
  :where(.Aspect) {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  :where(.Aspect__ratio) {
    display: block;
    opacity: 0;
    width: 100%;
  }

  :where(.Aspect__content) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
</style>
