<script>
  import Icon from '../icon/Icon.svelte';

  export let icon = false;
  export let iconRight = false;

  const hasIcon = icon || iconRight;
</script>

<button class={$$props.class} class:--has-icon={hasIcon}>
  {#if icon}
    <Icon class="-pr-sm" name={icon} />
  {/if}
  <slot />
  {#if iconRight}
    <Icon class="-pl-sm" name={iconRight} />
  {/if}
</button>

<style lang="scss">
  button {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    padding: 0.25rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.25s;
    user-select: none;
    white-space: nowrap;
    background-color: white;
    border: 1px solid #333;

    @if mixin-exists(button) {
      @include button;
    }
  }
</style>
