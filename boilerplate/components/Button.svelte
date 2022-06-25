<script>
  import { classNameHelper } from '@/js/utils';
  import Icon from './Icon.svelte';

  export let href = false;
  export let icon = false;
  export let disabled = false;
  export let target = null;
  export let reverse = false;
  // Anchor
  const className = ['Button'];
  if (reverse) className.push('--reverse');
  if (href) className.push('--anchor');
</script>

{#if !href}
  <button class={classNameHelper(className, $$props)} {disabled} on:click|preventDefault>
    {#if icon}
      <Icon ex-class="-icon" name={icon} />
    {/if}
    <slot />
  </button>
{:else}
  <a {href} {target} class={classNameHelper(className, $$props)} on:click>
    {#if icon}
      <Icon ex-class="-icon" name={icon} />
    {/if}
    <slot />
  </a>
{/if}

<style lang="scss" global>
  :where(.Button) {
    align-items: center;
    background-color: white;
    border-radius: 3px;
    border: 1px solid #333;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 1rem;
    gap: 0.5rem;
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.25s;
    user-select: none;
    white-space: nowrap;

    &:focus,
    &:hover {
      background-color: darken(white, 5%);
      box-shadow: 0px 12px 24px -6px rgb(0 0 0 / 30%);
    }

    &:disabled {
      border-color: lightgray;
      color: lightgray;
      cursor: not-allowed;
    }
  }
</style>
