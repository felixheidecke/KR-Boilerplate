<script>
  import classnames from 'classnames';
  import Icon from './Icon.svelte';

  export let to;
  export let icon = 'fas fa-envelope';

  const iconName = typeof icon === 'boolean' ? 'far fa-envelope' : icon;
  const obfuscated = to.trim().split('').join('&shy;');

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Mail';

  $: className = classnames(baseName, $$props.class);
</script>

<a
  name="email"
  ref="external"
  on:click={() => (location.href = 'mailto:' + to)}
  class={className}
>
  {#if icon}
    <Icon ex-class={baseName + '__icon'} name={iconName} />
  {/if}
  <span class={baseName + '__address'}>
    {#if $$slots.default}
      <slot />
    {:else}
      {@html obfuscated}
    {/if}
  </span>
</a>

<style lang="scss" global>
  :where(.Mail) {
    cursor: pointer;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
  }

  :where(.Mail__address) {
    text-decoration: underline;
  }
</style>
