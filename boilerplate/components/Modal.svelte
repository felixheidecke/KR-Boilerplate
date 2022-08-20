<script>
  import classnames from 'classnames'
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'

  import Icon from './Icon.svelte'

  const emit = createEventDispatcher()

  // --- Props ------------------------

  export let title = false
  export let isOpen = false

  // --- Methods ----------------------

  const close = () => {
    isOpen = false
    emit('close')
  }

  export const open = () => (isOpen = true)

  const onKeyDown = ({ key }) => {
    if (key === 'Escape') close()
  }

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Modal'

  $: className = classnames(baseName, $$props.class)
</script>

{#if isOpen}
  <div
    class={className}
    transition:fade={{ duration: 333 }}
    on:click|self={close}
  >
    <div class={baseName + '__wrapper'}>
      <button class={baseName + '__close-button'} on:click={close}>
        <Icon name="fas fa-times-circle" />
      </button>
      {#if title}
        <header class={baseName + '__header'}>{title}</header>
      {/if}
      <main class={baseName + '__body'}>
        <slot />
      </main>
      {#if $$slots.footer}
        <footer class={baseName + '__footer'}><slot name="footer" /></footer>
      {/if}
    </div>
  </div>
{/if}

<svelte:window on:keydown={onKeyDown} />

<style lang="scss" global>
  :where(.Modal) {
    background-color: rgba(black, 0.333);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
  }

  :where(.Modal__wrapper) {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32rem;
    max-width: 80vw;
    box-shadow: 0.5rem 0.5rem 1rem rgba(black, 0.25);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  :where(.Modal__close-button) {
    @include reset;
    position: absolute;
    top: 0rem;
    right: 0rem;
    border: 0 none;
    background: none;
    padding: 0.5rem;
    cursor: pointer;
  }

  :where(.Modal__header) {
    padding: 1rem 1.5rem;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid lightgray;
    background-color: white;
  }

  :where(.Modal__body) {
    padding: 1.5rem;
    overflow-y: auto;
    max-height: 80vh;
    background-color: white;

    & > *:first-child {
      margin-top: 0;
    }

    & > *:last-child {
      margin-bottom: 0;
    }
  }

  :where(.Modal__footer) {
    border-top: 1px solid lightgray;
    padding: 1rem 1.5rem;
  }
</style>
