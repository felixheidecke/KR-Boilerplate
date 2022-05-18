<script>
  import { toClass } from '@/js/utils';
  import Icon from './Icon.svelte';

  export let href = false;
  export let icon = false;
  export let disabled = false;
</script>

{#if !href}
  <button class={toClass(['Button'], $$props)} {disabled}>
    {#if icon}
      <Icon ex-class="-icon" name={icon} />
    {/if}
    <slot />
  </button>
{:else}
  <a {href} class={toClass(['Button', '--anchor'], $$props)}>
    {#if icon}
      <Icon ex-class="-icon" name={icon} />
    {/if}
    <slot />
  </a>
{/if}

<style lang="scss" global>
  .Button {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 1rem;
    padding: 0.25rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.25s;
    user-select: none;
    white-space: nowrap;
    background-color: white;
    border: 1px solid #333;
    gap: 0.5rem;

    &:disabled {
      border-color: lightgray;
      color: lightgray;
    }
  }
</style>
