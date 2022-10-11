<script>
  import classNames from 'classnames'

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'ButtonRow'

  $: className = classNames(baseName, $$props.class)
</script>

<div data-component class={className}>
  <slot />
</div>

<style lang="scss">
  .ButtonRow {
    display: flex;
  }

  @include breakpoint('mobile') {
    .ButtonRow {
      flex-direction: column;
    }
  }

  .ButtonRow :global {
    .Button:not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    .Button:hover {
      z-index: 1;
    }

    @include breakpoint('mobile') {
      .Button:first-child {
        border-bottom: {
          right-radius: 0;
          left-radius: 0;
        }
      }

      .Button:last-child {
        border-top: {
          right-radius: 0;
          left-radius: 0;
        }
      }

      .Button {
        justify-content: center;
        width: 100%;
      }

      .Button + .Button {
        margin-top: -1px;
      }
    }

    @include breakpoint('tablet-up') {
      .Button:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .Button:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .Button + .Button {
        margin-left: -1px;
      }
    }
  }
</style>
