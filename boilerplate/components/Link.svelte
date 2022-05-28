<script>
  import { classNameHelper } from '@/js/utils';

  export let href;
  export let target;

  const props = {
    class: ['Link']
  };

  if (href.indexOf('http') === 0) {
    props.class.push('--external');
    props.target = '_blank';
    props.rel = 'no-follow';
  } else {
    props.class.push('--internal');
  }

  if (target) {
    props.target = target;
  }

  props.class = classNameHelper(props.class, $$props);
</script>

<a {href} {...props}>
  <slot />
</a>
