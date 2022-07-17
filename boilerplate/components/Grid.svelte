<script>
  import classnames from 'classnames';

  // --- Props ------------------------

  export let tag = 'div';
  export let gap = false;
  export let size = false;
  export let id = null;

  // --- Methods ----------------------

  const sizeToClass = (size) => {
    if (typeof size !== 'string') return;

    return size
      .split(' ')
      .map((i) => `${baseName}__item--${i}`)
      .join(' ');
  };

  // --- CSS Class --------------------

  const baseName = 'Grid';

  $: className = (() => {
    if (size) {
      return classnames(baseName + '__item', $$props.class, sizeToClass(size));
    } else {
      return classnames(baseName, $$props.class, !gap || baseName + '--gap');
    }
  })();
</script>

<svelte:element this={tag} class={className} {id}>
  <slot />
</svelte:element>

<style lang="scss" global>
  .Grid {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .Grid--gap {
    width: calc(100% + 2rem);
    transform: translateX(-1rem);

    [class*='Grid__item'] {
      padding: {
        left: 1rem;
        right: 1rem;
      }
    }
  }

  .Grid__item {
    width: 100%;

    &--1-3 {
      width: calc(100% / 3);
    }

    &--2-3 {
      width: calc(100% / 1.5);
    }

    &--1-2,
    &--2-4 {
      width: 50%;
    }

    &--1-4 {
      width: 25%;
    }

    &--3-4 {
      width: 75%;
    }

    &--1-5 {
      width: 20%;
    }

    &--2-5 {
      width: 40%;
    }

    &--3-5 {
      width: 60%;
    }

    &--4-5 {
      width: 80%;
    }
  }

  $gridquery: (
    'mobile': #{map-get($mediaquery, 'mobile')},
    'tablet': #{map-get($mediaquery, 'tablet-up')},
    'desktop': #{map-get($mediaquery, 'desktop-up')},
    'widescreen': #{map-get($mediaquery, 'widescreen')}
  );

  .Grid__item {
    @each $m, $query in $gridquery {
      @media #{$query} {
        &--#{$m}-1-3 {
          width: calc(100% / 3);
        }

        &--#{$m}-2-3 {
          width: calc(100% / 1.5);
        }

        &--#{$m}-1-2,
        &--#{$m}-2-4 {
          width: 50%;
        }

        &--#{$m}-1-4 {
          width: 25%;
        }

        &--#{$m}-3-4 {
          width: 75%;
        }

        &--#{$m}-1-5 {
          width: 20%;
        }

        &--#{$m}-2-5 {
          width: 40%;
        }

        &--#{$m}-3-5 {
          width: 60%;
        }

        &--#{$m}-4-5 {
          width: 80%;
        }
      }
    }
  }
</style>
