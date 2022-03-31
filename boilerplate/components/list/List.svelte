<script>
  import './List.scss';

  export let disc = false;
  export let dash = false;

  const className = ['kr-list'];

  if (disc) className.push('--disc');
  else if (dash) className.push('--dash');
</script>

<ul class={className.toClass($$props)}>
  <slot />
</ul>
