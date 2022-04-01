<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  let activeItem = writable(1);
  setContext('activeItem', activeItem);
</script>

<ul class={['accordion'].toClass($$props)}>
  <slot />
</ul>

<style lang="scss" global>
  .accordion {
    width: 100%;

    .-slide {
      border: 1px solid lightgray;
      margin-bottom: 1rem;

      &-title {
        background: lightgray;
        padding: 0.25rem 0.5rem;
        margin: 0;
        cursor: pointer;
      }

      &-content {
        padding: 0 1rem;
      }
    }
  }
</style>
