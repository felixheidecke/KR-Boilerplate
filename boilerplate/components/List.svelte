<script>
  import { toClass } from '@/js/utils';
  export let disc = false;
  export let dash = false;

  const className = ['List'];

  if (disc) className.push('--disc');
  else if (dash) className.push('--dash');
</script>

<ul class={toClass(className, $$props)}>
  <slot />
</ul>

<style lang="scss" global>
  .List {
    padding-left: 1rem;
    margin-left: 0.75rem;

    &.--dash > li {
      &::marker {
        display: none;
      }

      &::before {
        content: '-';
        transform: translateX(-1rem);
        position: absolute;
      }
    }

    &.--disc {
      list-style: disc;
    }

    &:not(.--disc) {
      list-style: none;
    }
  }
</style>
