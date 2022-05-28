<script>
  import { classNameHelper } from '@/js/utils';
</script>

<div class={classNameHelper(['Wrapper'], $$props)}>
  <slot />
</div>

<style lang="scss" global>
  :where(.Wrapper) {
    width: 100%;
    max-width: 64rem;

    padding: {
      left: 1rem;
      right: 1rem;
    }

    margin: {
      left: auto;
      right: auto;
    }

    @include breakpoint('tablet-up') {
      padding: {
        left: 2rem;
        right: 2rem;
      }
    }
  }
</style>
