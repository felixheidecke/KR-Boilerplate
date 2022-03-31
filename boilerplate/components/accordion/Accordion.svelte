<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  let activeItem = writable(1);
  setContext('activeItem', activeItem);

  console.log(window);

  // -- CSS Classes ---------------------------------------------
  import './Accordion.scss';
  export let blank = false;
  import CN from '@/js/className';

  const cn = new CN($$props.class);

  cn.addClass = !blank ? 'kr-accordion' : 'accordion';
  // ------------------------------------------------------------
</script>

<ul class={cn.render()}>
  <slot />
</ul>

<style lang="scss" global>
  .kr-accordion {
    width: 100%;

    &__slide {
      border: 1px solid lightgray;
      margin-bottom: 1rem;
    }

    &__slide-title {
      background: lightgray;
      padding: 0.25rem 0.5rem;
      margin: 0;
      cursor: pointer;
    }

    &__slide-content {
      padding: 0 1rem;
    }
  }
</style>
