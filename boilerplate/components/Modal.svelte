<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { classNameHelper } from '@/js/utils';

  import Icon from './Icon.svelte';

  const emit = createEventDispatcher();

  export let title = false;
  let isOpen = $$props['is-open'];

  const close = () => {
    isOpen = false;
    emit('close');
  };

  export const open = () => (isOpen = true);

  const onKeyDown = ({ key }) => {
    if (key === 'Escape') close();
  };
</script>

{#if isOpen}
  <section class={classNameHelper(['Modal'], $$props)} transition:fade={{ duration: 100 }} on:click|self={close}>
    <div class="-wrapper">
      <button class="-close-button --pointer" on:click={close}>
        <Icon name="fas fa-times-circle" />
      </button>
      {#if title}
        <header class="-header">{title}</header>
      {/if}
      <main class="-body">
        <slot />
      </main>
      {#if $$slots.footer}
        <footer class="-footer"><slot name="footer" /></footer>
      {/if}
    </div>
  </section>
{/if}

<svelte:window on:keydown={onKeyDown} />

<style lang="scss">
  :where(.Modal) {
    background-color: rgba(black, 0.333);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;

    .-wrapper {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32rem;
      max-width: 90vw;
      max-height: 80vh;
      background-color: white;
      box-shadow: 0.5rem 0.5rem 1rem rgba(black, 0.25);
      border-radius: 0.5rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .-close-button {
      @include reset;
      position: absolute;
      top: 0rem;
      right: 0rem;
      border: 0 none;
      background: none;
      padding: 0.5rem;
      cursor: pointer;
    }

    .-header {
      padding: 1rem 1.5rem;
      font-weight: bold;
      text-align: center;
      border-bottom: 1px solid lightgray;
    }

    .-body {
      padding: 1.5rem;
      overflow-y: scroll;

      & > *:first-child {
        margin-top: 0;
      }

      & > *:last-child {
        margin-bottom: 0;
      }
    }

    .-footer {
      border-top: 1px solid lightgray;
      padding: 1rem 1.5rem;
    }
  }
</style>
