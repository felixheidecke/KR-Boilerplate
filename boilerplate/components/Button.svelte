<script>
  import Icon from './Icon.svelte';

  export let icon = false;
  export let iconRight = false;

  const hasIcon = icon || iconRight;
</script>

<button class={['Button'].toClass($$props)} class:--has-icon={hasIcon}>
  {#if icon}
    <Icon ex-class="-icon-left" name={icon} />
  {/if}
  <slot />
  {#if iconRight}
    <Icon ex-class="-icon-right" name={iconRight} />
  {/if}
</button>

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

    .-icon-left {
      margin-right: 0.5rem;
    }

    .-icon-right {
      margin-left: 0.5rem;
    }
  }
</style>
