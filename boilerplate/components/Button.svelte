<script>
  import classnames from 'classnames';
  import Icon from './Icon.svelte';

  // --- Props ------------------------

  export let to = false;
  export let icon = false;
  export let disabled = false;
  export let target = null;
  export let reverse = false;

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Button';

  $: className = classnames(
    baseName,
    $$props.class,
    !reverse || baseName + '--reverse',
    !to || baseName + '--anchor'
  );
</script>

{#if !to}
  <button class={className} {disabled} on:click|preventDefault>
    {#if icon}
      <Icon ex-class={baseName + '__icon'} name={icon} />
    {/if}
    <slot />
  </button>
{:else}
  <a href={to} {target} class={className} on:click>
    {#if icon}
      <Icon ex-class={baseName + '__icon'} name={icon} />
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

    &:not(:disabled):hover {
      background-color: darken(white, 5%);
      box-shadow: 0px 12px 24px -6px rgb(0 0 0 / 30%);
    }

    &:disabled {
      border-color: darkgrey;
      color: darkgrey;
      cursor: not-allowed;
    }
  }

  :where(.Button--reverse) {
    flex-direction: row-reverse;
  }
</style>
