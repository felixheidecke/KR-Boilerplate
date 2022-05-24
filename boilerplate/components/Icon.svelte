<script>
  import { toClass } from '@/js/utils';
  export let name = 'fas fa-carrot';
  export let size = false;

  // -- CSS Classes -------------------
  const className = ['Icon', name];

  if (size > 1 && size <= 10) {
    className.push(`fa-${size}x`);
  }
</script>

<i class={toClass(className, $$props)} aria-hidden />

<style lang="scss" global>
  @import url('https://cdn.klickrhein.de/libs/font-awesome/5.14.0/css/all.min.css');
</style>
