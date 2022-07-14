<script>
  import classnames from 'classnames';
  import Icon from './Icon.svelte';

  let isVisible = false;

  export let name = null;

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Toplink';

  $: className = classnames(
    baseName,
    $$props.class,
    !isVisible || baseName + '--visible'
  );

  // --- Methods ----------------------

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOffset = () => {
    isVisible = window.scrollY > 200;
  };
</script>

<svelte:window on:scroll|passive={handleOffset} />

<button {name} class={className} on:click={scrollToTop}>
  <Icon name="fas fa-angle-up" size="5" />
</button>

<style lang="scss" global>
  :where(.Toplink) {
    position: fixed;
    right: 0.5rem;
    bottom: 0.5rem;
    height: 5rem;
    width: 5rem;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.5s, transform 0.5s;
    border: 0 none;
    transform: translateY(120%);
    background-color: gainsboro;

    &:hover {
      opacity: 1;
    }

    @media only screen and (max-width: 500px) {
      height: 50px;
      width: 50px;
    }
  }

  :where(.Toplink--visible) {
    transform: translateY(0%);
  }
</style>
