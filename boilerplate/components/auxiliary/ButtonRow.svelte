<section class="ButtonRow">
  <slot />
</section>

<style lang="scss">
  .ButtonRow {
    display: flex;
  }

  .ButtonRow :global {
    .Button:not(:first-child):not(:last-child) {
      border-radius: 0;
    }

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

    .Button:hover {
      z-index: 1;
    }
  }
</style>
