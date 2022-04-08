<script>
  import { toClass } from '@/js/utils';
  import Icon from './Icon.svelte';

  let isHidden = true;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOffset = () => {
    isHidden = window.scrollY < 200;
  };
</script>

<svelte:window on:scroll|passive={handleOffset} />

<button class={toClass(['Toplink'], $$props)} class:--hidden={isHidden} on:click={scrollToTop}>
  <Icon name="fas fa-angle-up" size="5" />
</button>

<style lang="scss">
  .Toplink {
    @if mixin-exists(Toplink-reset) {
      @include Toplink-reset;
    } @else {
      position: fixed;
      right: 0.5rem;
      bottom: 0.5rem;
      height: 5rem;
      width: 5rem;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.5s, transform 0.5s;
      border: 0 none;

      &:hover {
        opacity: 1;
      }

      @media only screen and (max-width: 500px) {
        height: 50px;
        width: 50px;
      }

      &.--hidden {
        transform: translateY(120%);
      }

      @if mixin-exists(Toplink) {
        @include Toplink;
      }
    }
  }
</style>
