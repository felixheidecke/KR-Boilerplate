<script>
  import { classNameHelper } from '@/js/utils';
  export let gap = false;
  export let size = false;

  const className = [];

  if (size) {
    className.push('-item');
    className.push(
      size
        .split(' ')
        .map((i) => `--${i}`)
        .join(' ')
    );
  } else {
    className.push('Grid');
    if (gap) className.push('--gap');
  }
</script>

<div class={classNameHelper(className, $$props)} id={$$props.id}>
  <slot />
</div>

<style lang="scss" global>
  :where(.Grid) {
    display: flex;
    flex-wrap: wrap;

    &.--gap {
      width: calc(100% + 2rem);
      transform: translateX(-1rem);

      .-item {
        padding: {
          left: 1rem;
          right: 1rem;
        }
      }
    }
  }

  .Grid .-item {
    width: 100%;

    &.--1-3 {
      width: calc(100% / 3);
    }

    &.--2-3 {
      width: calc(100% / 1.5);
    }

    &.--1-2,
    &.--2-4 {
      width: 50%;
    }

    &.--1-4 {
      width: 25%;
    }

    &.--3-4 {
      width: 75%;
    }

    &.--1-5 {
      width: 20%;
    }

    &.--2-5 {
      width: 40%;
    }

    &.--3-5 {
      width: 60%;
    }

    &.--4-5 {
      width: 80%;
    }
  }

  $gridquery: (
    'mobile': #{map-get($mediaquery, 'mobile')},
    'tablet': #{map-get($mediaquery, 'tablet-up')},
    'desktop': #{map-get($mediaquery, 'desktop-up')},
    'widescreen': #{map-get($mediaquery, 'widescreen')}
  );

  .Grid .-item {
    @each $m, $query in $gridquery {
      @media #{$query} {
        &.--#{$m}-1-3 {
          width: calc(100% / 3);
        }

        &.--#{$m}-2-3 {
          width: calc(100% / 1.5);
        }

        &.--#{$m}-1-2,
        &.--#{$m}-2-4 {
          width: 50%;
        }

        &.--#{$m}-1-4 {
          width: 25%;
        }

        &.--#{$m}-3-4 {
          width: 75%;
        }

        &.--#{$m}-1-5 {
          width: 20%;
        }

        &.--#{$m}-2-5 {
          width: 40%;
        }

        &.--#{$m}-3-5 {
          width: 60%;
        }

        &.--#{$m}-4-5 {
          width: 80%;
        }
      }
    }
  }
</style>
