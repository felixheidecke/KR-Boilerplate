<script>
  import classnames from 'classnames';
  export let name = 'fas fa-carrot';
  export let size = false;

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Icon';

  $: className = classnames(
    baseName,
    name,
    !(size > 1 && size <= 10) || `fa-${size}x`
  );
</script>

<i class={className} aria-hidden on:click />

<style lang="scss" global>
  @import url('https://cdn.klickrhein.de/libs/font-awesome/5.15.4/css/all.min.css');
</style>
