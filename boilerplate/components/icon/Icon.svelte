<script>
  export let name = 'fas fa-carrot';
  export let size = false;

  // -- CSS Classes -------------------
  export let blank = false;

  const className = [name];

  if (blank) className.push('icon');
  else className.push('kr-icon');

  if (size > 1 && size <= 10) {
    className.push(`fa-${size}x`);
  }
</script>

<i class={className.toClass($$props)} />

<style>
  @import url('https://cdn.klickrhein.de/libs/font-awesome/5.14.0/css/all.min.css');
</style>
