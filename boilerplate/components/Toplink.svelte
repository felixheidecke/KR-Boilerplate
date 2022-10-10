<script>
  import classnames from 'classnames'

  export let name = null

  let isVisible = false

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Toplink'

  $: className = classnames(baseName, $$props.class, !isVisible || baseName + '--visible')

  // --- Methods ----------------------

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOffset = () => {
    isVisible = window.scrollY > 200
  }
</script>

<svelte:window on:scroll|passive={handleOffset} />

<button {name} class={className} on:click={scrollToTop}>
  <svg class="{baseName}__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
    <path
      d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"
    />
  </svg>
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
    display: flex;
    padding: 1rem;
    align-items: center;

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
