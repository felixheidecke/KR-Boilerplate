<div class="Wrapper">
  <slot />
</div>

<style lang="scss">
  .Wrapper {
    max-width: 60rem;
    position: relative;

    margin: {
      left: auto;
      right: auto;
    }

    padding: {
      left: 1rem;
      right: 1rem;
    }

    @include breakpoint('tablet-up') {
      padding: {
        left: 2rem;
        right: 2rem;
      }
    }
  }
</style>
